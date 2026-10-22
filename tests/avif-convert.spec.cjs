const { test, expect } = require('@playwright/test');
const fs = require('fs');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
  <circle cx="230" cy="120" r="60" fill="#ea4333"/>
</svg>`;

test('AVIF conversion downloads a real AVIF file with the correct signature', async ({ page }) => {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'avif-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/avif"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename().toLowerCase().endsWith('.avif')).toBe(true);

  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.length).toBeGreaterThan(20);
  expect(bytes.subarray(4, 8).toString('ascii')).toBe('ftyp');
  expect(bytes.subarray(8, 12).toString('ascii')).toMatch(/avif|avis/);

  // Verify the downloaded AVIF can be decoded and still contains the fixture content.
  const decoded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/avif;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      yellow: Array.from(context.getImageData(100, 100, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(decoded.width).toBe(320);
  expect(decoded.height).toBe(240);
  expect(decoded.yellow[0]).toBeGreaterThan(180);
  expect(decoded.yellow[1]).toBeGreaterThan(120);
  expect(decoded.yellow[2]).toBeLessThan(120);
});

test('AVIF conversion reports encoder-load failure and restores the action button', async ({ page }) => {
  // AVIF currently uses a remote encoder module; force that dependency to fail
  // so this test exercises the real applyChanges() catch/recovery path.
  await page.route('https://code4fukui.github.io/AVIF/AVIF.js', route => route.abort());
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'avif-error-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/avif"]').click();

  // Replace alert with a deterministic spy to avoid native-dialog timing races.
  await page.evaluate(() => {
    window.__auditAlertMessage = '';
    window.alert = message => { window.__auditAlertMessage = String(message); };
  });
  await page.locator('#apply-btn').click();
  await expect.poll(() => page.evaluate(() => window.__auditAlertMessage))
    .toMatch(/Image processing failed|Could not|AVIF|try again/i);
  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
});



test('AVIF conversion preserves transparency and foreground pixels in the downloaded image', async ({ page }) => {
  const transparentSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 0 80 60">
    <rect x="20" y="15" width="40" height="30" fill="#e53935"/>
  </svg>`;
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'avif-transparency-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(transparentSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/avif"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\\.avif$/i);
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.subarray(4, 8).toString('ascii')).toBe('ftyp');
  expect(bytes.subarray(8, 12).toString('ascii')).toMatch(/avif|avis/);

  const pixels = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/avif;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      transparent: Array.from(context.getImageData(5, 5, 1, 1).data),
      foreground: Array.from(context.getImageData(35, 25, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(pixels.width).toBe(80);
  expect(pixels.height).toBe(60);
  expect(pixels.transparent[3]).toBeLessThan(20);
  expect(pixels.foreground[0]).toBeGreaterThan(170);
  expect(pixels.foreground[1]).toBeLessThan(110);
  expect(pixels.foreground[2]).toBeLessThan(110);
  expect(pageErrors).toEqual([]);
});
