const { test, expect } = require('@playwright/test');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#124f8a"/><stop offset="1" stop-color="#f2a65a"/></linearGradient>
    <pattern id="p" width="31" height="31" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="8" fill="#ffffff" fill-opacity=".55"/></pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <rect width="1200" height="800" fill="url(#p)"/>
  <rect x="300" y="100" width="600" height="600" fill="#1d4ed8" fill-opacity=".55"/>
  <circle cx="600" cy="400" r="180" fill="#fef3c7"/>
</svg>`;

async function loadFixture(page) {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);
}

for (const targetKB of [10, 50, 100, 200]) {
  test(`JPG target-size output stays at or below selected ${targetKB} KB`, async ({ page }) => {
    await loadFixture(page);

    // Choose JPG while the Convert panel is visible, then switch to Target.
    // PNG ignores canvas quality settings, so JPG exercises the lossy search path.
    await page.locator('.tab-btn[data-tab="convert"]').click();
    await page.locator('#tab-convert [data-format="image/jpeg"]').click();
    await page.locator('.tab-btn[data-tab="target"]').click();
    await page.locator(`#tab-target [data-target="${targetKB}"]`).click();
    await page.locator('#apply-btn').click();
    await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-btn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.jpg$/i);

    const filePath = await download.path();
    expect(filePath).toBeTruthy();
    const fs = require('fs');
    const output = fs.readFileSync(filePath);
    expect(output.length).toBeGreaterThan(3);
    expect(output[0]).toBe(0xff);
    expect(output[1]).toBe(0xd8);
    expect(output[2]).toBe(0xff);
    expect(output.length).toBeLessThanOrEqual(targetKB * 1024);

    // Confirm the saved file actually decodes and keeps the expected dimensions.
    const decoded = await page.evaluate(async base64 => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${base64}`;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      return {
        width: image.naturalWidth,
        height: image.naturalHeight,
        center: Array.from(context.getImageData(600, 400, 1, 1).data)
      };
    }, output.toString('base64'));

    expect(decoded.width).toBe(1200);
    expect(decoded.height).toBe(800);
    expect(decoded.center[0]).toBeGreaterThan(180);
    expect(decoded.center[1]).toBeGreaterThan(160);
    expect(decoded.center[2]).toBeGreaterThan(120);
  });
}

test('unreachable target size reports failure and does not offer a download', async ({ page }) => {
  await loadFixture(page);
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/jpeg"]').click();
  await page.locator('.tab-btn[data-tab="target"]').click();
  await page.locator('#tab-target [data-target="10"]').click();

  // Simulate an encoder that cannot produce an output under the requested limit.
  await page.evaluate(() => {
    HTMLCanvasElement.prototype.toBlob = function (callback, type) {
      callback(new Blob([new Uint8Array(12 * 1024)], { type: type || 'image/jpeg' }));
    };
  });

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();
  expect(dialogMessage).toMatch(/Could not reach the selected 10 KB limit/i);

  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
  let downloaded = false;
  page.once('download', () => { downloaded = true; });
  await page.locator('#download-btn').click();
  await page.waitForTimeout(200);
  expect(downloaded, 'an over-limit output must not be downloadable as a successful result').toBe(false);
});

test('failed target-size reprocessing invalidates a previous download', async ({ page }) => {
  await loadFixture(page);
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/jpeg"]').click();
  await page.locator('.tab-btn[data-tab="target"]').click();
  await page.locator('#tab-target [data-target="200"]').click();

  // First create a valid result so this checks stale-output handling.
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  // Now force the next encode attempt to be impossible for the 10 KB limit.
  await page.locator('.tab-btn[data-tab="target"]').click();
  await page.locator('#tab-target [data-target="10"]').click();
  await page.evaluate(() => {
    HTMLCanvasElement.prototype.toBlob = function (callback, type) {
      callback(new Blob([new Uint8Array(12 * 1024)], { type: type || 'image/jpeg' }));
    };
  });

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();
  await expect.poll(() => dialogMessage).toMatch(/Could not reach the selected 10 KB limit/i);
  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');

  let downloaded = false;
  page.once('download', () => { downloaded = true; });
  await page.locator('#download-btn').click();
  await page.waitForTimeout(200);
  expect(downloaded, 'a failed second attempt must not download a stale previous result').toBe(false);
});

test('PNG target-size mode rejects an output that exceeds the selected limit', async ({ page }) => {
  await loadFixture(page);

  // Selecting a target preset automatically selects JPEG. Select the target
  // first, then explicitly switch back to PNG so this tests the non-quality path.
  await page.locator('.tab-btn[data-tab="target"]').click();
  await page.locator('#tab-target [data-target="10"]').click();
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/png"]').click();
  await expect(page.locator('#tab-convert [data-format="image/png"]')).toHaveClass(/active/);

  // PNG encoders ignore the quality argument; simulate the browser returning
  // an output larger than 10 KB so the non-quality target path is covered.
  await page.evaluate(() => {
    HTMLCanvasElement.prototype.toBlob = function (callback, type) {
      callback(new Blob([new Uint8Array(12 * 1024)], { type: type || 'image/png' }));
    };
  });

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();
  expect(dialogMessage).toMatch(/Could not reach the selected 10 KB limit/i);
  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');

  let downloaded = false;
  page.once('download', () => { downloaded = true; });
  await page.locator('#download-btn').click();
  await page.waitForTimeout(200);
  expect(downloaded, 'an over-limit PNG must not be downloadable as a successful result').toBe(false);
});

test('unreachable target reports failure after repeated encoder misses', async ({ page }) => {
  await loadFixture(page);
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/jpeg"]').click();
  await page.locator('.tab-btn[data-tab="target"]').click();
  await page.locator('#tab-target [data-target="10"]').click();

  // Force the encoder to return oversized files even after the image dimensions
  // have been reduced, exercising the final fallback rather than real encoding.
  await page.evaluate(() => {
    HTMLCanvasElement.prototype.toBlob = function (callback, type) {
      callback(new Blob([new Uint8Array(12 * 1024)], { type: type || 'image/jpeg' }));
    };
  });

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();
  await expect.poll(() => dialogMessage).toMatch(/Could not reach the selected 10 KB limit/i);
  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
});
