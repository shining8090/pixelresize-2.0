const { test, expect } = require('@playwright/test');
const fs = require('fs');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
  <circle cx="230" cy="120" r="60" fill="#ea4335"/>
</svg>`;

test('GIF conversion downloads a real GIF file with the correct signature', async ({ page }) => {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'gif-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/gif"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.gif$/i);

  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.length).toBeGreaterThan(20);
  expect(bytes.subarray(0, 6).toString('ascii')).toMatch(/^GIF8[79]a$/);

  // Validate that the output decodes and retains the expected dimensions/content.
  const decoded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/gif;base64,${base64}`;
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
  expect(decoded.yellow[0]).toBeGreaterThan(150);
  expect(decoded.yellow[1]).toBeGreaterThan(100);
  expect(decoded.yellow[2]).toBeLessThan(140);
});

test('GIF conversion composites transparent pixels onto white and preserves opaque colors', async ({ page }) => {
  const transparentSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 0 80 60">
    <rect x="20" y="15" width="40" height="30" fill="#e53935"/>
  </svg>`;
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'gif-transparency-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(transparentSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/gif"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);

  const pixels = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/gif;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      transparentArea: Array.from(context.getImageData(5, 5, 1, 1).data),
      redArea: Array.from(context.getImageData(35, 25, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(pixels.width).toBe(80);
  expect(pixels.height).toBe(60);
  expect(pixels.transparentArea[0]).toBeGreaterThanOrEqual(245);
  expect(pixels.transparentArea[1]).toBeGreaterThanOrEqual(245);
  expect(pixels.transparentArea[2]).toBeGreaterThanOrEqual(245);
  expect(pixels.redArea[0]).toBeGreaterThan(180);
  expect(pixels.redArea[1]).toBeLessThan(100);
  expect(pixels.redArea[2]).toBeLessThan(100);
});

