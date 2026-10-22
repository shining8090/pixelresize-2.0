const { test, expect } = require('@playwright/test');
const fs = require('fs');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
  <circle cx="230" cy="120" r="60" fill="#ea4335"/>
</svg>`;

test('BMP conversion downloads a valid 24-bit BMP file and preserves image content', async ({ page }) => {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'bmp-conversion-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/bmp"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename().toLowerCase().endsWith('.bmp')).toBe(true);

  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.length).toBeGreaterThan(54);
  expect(bytes.subarray(0, 2).toString('ascii')).toBe('BM');
  expect(bytes.readUInt32LE(10)).toBe(54);
  expect(bytes.readUInt32LE(14)).toBe(40);
  expect(bytes.readInt32LE(18)).toBe(320);
  expect(bytes.readInt32LE(22)).toBe(240);
  expect(bytes.readUInt16LE(28)).toBe(24);

  // A valid BMP header alone does not prove the downloaded pixels are usable.
  const decoded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/bmp;base64,${base64}`;
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

test('BMP conversion handles row padding and preserves top and bottom rows', async ({ page }) => {
  const oddWidthSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="9" viewBox="0 0 17 9">
    <rect width="17" height="4" fill="#e53935"/>
    <rect y="4" width="17" height="5" fill="#174ea6"/>
  </svg>`;
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'bmp-odd-width-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(oddWidthSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/bmp"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);

  // 17 * 3 = 51 bytes, padded to a 52-byte row in a 24-bit BMP.
  expect(bytes.readUInt32LE(2)).toBe(54 + 52 * 9);
  expect(bytes.readUInt32LE(34)).toBe(52 * 9);
  expect(bytes.readInt32LE(18)).toBe(17);
  expect(bytes.readInt32LE(22)).toBe(9);

  const decoded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/bmp;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      top: Array.from(context.getImageData(8, 1, 1, 1).data),
      bottom: Array.from(context.getImageData(8, 7, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(decoded.width).toBe(17);
  expect(decoded.height).toBe(9);
  expect(decoded.top[0]).toBeGreaterThan(180);
  expect(decoded.top[1]).toBeLessThan(100);
  expect(decoded.bottom[2]).toBeGreaterThan(100);
  expect(decoded.bottom[0]).toBeLessThan(100);
});



test('BMP conversion composites transparent pixels onto white', async ({ page }) => {
  const transparentSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="60" viewBox="0 0 80 60">
    <rect x="20" y="15" width="40" height="30" fill="#e53935"/>
  </svg>`;
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'bmp-transparency-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(transparentSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/bmp"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.subarray(0, 2).toString('ascii')).toBe('BM');

  const pixels = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/bmp;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return {
      background: Array.from(context.getImageData(5, 5, 1, 1).data),
      foreground: Array.from(context.getImageData(35, 25, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(pixels.background[0]).toBeGreaterThan(220);
  expect(pixels.background[1]).toBeGreaterThan(220);
  expect(pixels.background[2]).toBeGreaterThan(220);
  expect(pixels.foreground[0]).toBeGreaterThan(180);
  expect(pixels.foreground[1]).toBeLessThan(100);
  expect(pixels.foreground[2]).toBeLessThan(100);
});
