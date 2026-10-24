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

test('GIF conversion preserves broad color transitions in a gradient', async ({ page }) => {
  const gradientSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="32" viewBox="0 0 256 32">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#0000ff"/>
        <stop offset="33%" stop-color="#00ffff"/>
        <stop offset="66%" stop-color="#ffff00"/>
        <stop offset="100%" stop-color="#ff0000"/>
      </linearGradient>
    </defs>
    <rect width="256" height="32" fill="url(#g)"/>
  </svg>`;
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'gif-gradient-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(gradientSvg)
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

  const samples = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/gif;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    return [16, 80, 144, 240].map(x =>
      Array.from(context.getImageData(x, 16, 1, 1).data)
    );
  }, bytes.toString('base64'));

  expect(samples).toHaveLength(4);
  // Broad tolerances test the overall hue progression without requiring exact
  // pixel matches from a lossy 256-color palette and dithering.
  expect(samples[0][2]).toBeGreaterThan(samples[0][0]); // blue
  expect(samples[1][1]).toBeGreaterThan(samples[1][0]); // cyan/green
  expect(samples[2][0]).toBeGreaterThan(samples[2][2]); // yellow/orange
  expect(samples[3][0]).toBeGreaterThan(samples[3][2]); // red/orange
});

test('dedicated GIF tool route loads its encoder and downloads a valid GIF', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto('/tools/to-gif/');
  await expect(page).toHaveURL(new RegExp('/tools/to-gif/$'))
  await expect(page.locator('script[src="/gif-encoder.js"]')).toHaveCount(1);
  await expect.poll(() => page.evaluate(() => typeof window.GifWriter)).toBe('function');

  await page.locator('#file-input').setInputFiles({
    name: 'dedicated-gif-route-fixture.svg',
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
  expect(download.suggestedFilename().toLowerCase().endsWith('.gif')).toBe(true);

  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.length).toBeGreaterThan(20);
  expect(bytes.subarray(0, 6).toString('ascii')).toMatch(/^GIF8[79]a$/);

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
  expect(pageErrors).toEqual([]);
});

