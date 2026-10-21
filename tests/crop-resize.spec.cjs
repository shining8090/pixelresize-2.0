const { test, expect } = require('@playwright/test');
const fs = require('fs');

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

test('excessive output dimensions are rejected before canvas allocation', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'dimension-limit-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('#maintain-ratio').uncheck();
  await page.locator('#resize-w').fill('20000');
  await page.locator('#resize-h').fill('1000');

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();

  await expect.poll(() => dialogMessage).toContain('Requested dimensions are too large.');
  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
  expect(pageErrors).toEqual([]);
});

test('invalid resize dimensions are rejected without processing', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'invalid-dimension-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('#maintain-ratio').uncheck();

  for (const [width, height] of [['0', '100'], ['-1', '100'], ['12.5', '100'], ['', '100']]) {
    await page.locator('#resize-w').fill(width);
    await page.locator('#resize-h').fill(height);

    let dialogMessage = '';
    page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    await page.locator('#apply-btn').click();

    await expect.poll(() => dialogMessage).toContain('Enter a whole-number width and height greater than zero.');
    await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
  }
  expect(pageErrors).toEqual([]);
});

test('aspect-ratio locking never derives a zero-pixel dimension and preserves empty input for validation', async ({ page }) => {
  const wideSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300"><rect width="1200" height="300" fill="#2563eb"/></svg>';
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'wide-ratio-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(wideSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('#maintain-ratio').check();
  await page.locator('#resize-w').fill('1');
  await expect(page.locator('#resize-h')).toHaveValue('1');

  await page.locator('#resize-w').fill('');
  await expect(page.locator('#resize-w')).toHaveValue('');
  await expect(page.locator('#resize-h')).toHaveValue('1');

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();
  await expect.poll(() => dialogMessage).toContain('Enter a whole-number width and height greater than zero.');
  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
  expect(pageErrors).toEqual([]);
});

test('1:1 crop followed by explicit 256x256 resize preserves dimensions and center content', async ({ page }) => {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'crop-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('.tab-btn[data-tab="crop"]').click();
  await page.locator('#aspect-ratio-presets [data-ratio="1"]').click();

  // Resize inputs live inside the Resize tab; switching tabs preserves the crop rectangle.
  await page.locator('.tab-btn[data-tab="resize"]').click();

  // Disable aspect-ratio locking before entering both dimensions, otherwise the
  // second field recalculates the first from the original 1200x800 image ratio.
  await page.locator('#maintain-ratio').uncheck();
  await page.locator('#resize-w').fill('256');
  await page.locator('#resize-h').fill('256');

  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const preview = page.locator('#main-preview');
  await expect.poll(async () => preview.evaluate(img => img.naturalWidth)).toBe(256);
  await expect.poll(async () => preview.evaluate(img => img.naturalHeight)).toBe(256);

  const center = await preview.evaluate(img => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return Array.from(ctx.getImageData(128, 128, 1, 1).data);
  });
  expect(center[0]).toBeGreaterThan(220);
  expect(center[1]).toBeGreaterThan(200);
  expect(center[2]).toBeGreaterThan(150);

  // Validate the saved output too, so a correct preview cannot hide a bad download.
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.length).toBeGreaterThan(20);

  const downloaded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/octet-stream;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      center: Array.from(ctx.getImageData(128, 128, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(downloaded.width).toBe(256);
  expect(downloaded.height).toBe(256);
  expect(downloaded.center[0]).toBeGreaterThan(220);
  expect(downloaded.center[1]).toBeGreaterThan(200);
  expect(downloaded.center[2]).toBeGreaterThan(150);
});
