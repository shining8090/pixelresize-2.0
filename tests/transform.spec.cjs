const { test, expect } = require('@playwright/test');
const fs = require('fs');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect x="0" y="0" width="160" height="240" fill="#ff0000"/>
  <rect x="160" y="0" width="160" height="240" fill="#0000ff"/>
</svg>`;

async function loadFixture(page) {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'transform-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);
}

async function samplePixel(page, x, y) {
  return page.locator('#main-preview').evaluate((img, point) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return Array.from(ctx.getImageData(point.x, point.y, 1, 1).data);
  }, { x, y });
}

async function applyChanges(page) {
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });
  await expect.poll(async () => page.locator('#main-preview').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
}

test('horizontal flip reverses left and right image content', async ({ page }) => {
  await loadFixture(page);
  await page.locator('.tab-btn[data-tab="transform"]').click();
  await page.locator('#tab-transform .h-flip[data-flip="h"]').click();
  await applyChanges(page);

  const left = await samplePixel(page, 40, 120);
  const right = await samplePixel(page, 280, 120);
  expect(left[2]).toBeGreaterThan(200);
  expect(left[0]).toBeLessThan(40);
  expect(right[0]).toBeGreaterThan(200);
  expect(right[2]).toBeLessThan(40);

  // Confirm the downloaded output, not only the on-screen preview, contains the flip.
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
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
      left: Array.from(ctx.getImageData(40, 120, 1, 1).data),
      right: Array.from(ctx.getImageData(280, 120, 1, 1).data)
    };
  }, bytes.toString('base64'));
  expect(downloaded.width).toBe(320);
  expect(downloaded.height).toBe(240);
  expect(downloaded.left[2]).toBeGreaterThan(200);
  expect(downloaded.right[0]).toBeGreaterThan(200);
});

test('90-degree rotation swaps the output width and height', async ({ page }) => {
  await loadFixture(page);
  await page.locator('.tab-btn[data-tab="transform"]').click();
  await page.locator('#tab-transform .h-rotate[data-angle="90"]').click();
  await applyChanges(page);

  const preview = page.locator('#main-preview');
  await expect.poll(async () => preview.evaluate(img => img.naturalWidth)).toBe(240);
  await expect.poll(async () => preview.evaluate(img => img.naturalHeight)).toBe(320);

  // Verify the saved file also decodes with the rotated dimensions.
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  const downloaded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/octet-stream;base64,${base64}`;
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  }, bytes.toString('base64'));
  expect(downloaded.width).toBe(240);
  expect(downloaded.height).toBe(320);
});

test('vertical flip reverses top and bottom image content in downloaded output', async ({ page }) => {
  const fixture = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120" viewBox="0 0 160 120">
    <rect width="160" height="60" fill="#ff0000"/>
    <rect y="60" width="160" height="60" fill="#0000ff"/>
  </svg>`;
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'vertical-flip-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixture)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('.tab-btn[data-tab="transform"]').click();
  await page.locator('#tab-transform .h-flip[data-flip="v"]').click();
  await applyChanges(page);

  const top = await samplePixel(page, 80, 20);
  const bottom = await samplePixel(page, 80, 100);
  expect(top[2]).toBeGreaterThan(200);
  expect(top[0]).toBeLessThan(40);
  expect(bottom[0]).toBeGreaterThan(200);
  expect(bottom[2]).toBeLessThan(40);

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
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
      top: Array.from(ctx.getImageData(80, 20, 1, 1).data),
      bottom: Array.from(ctx.getImageData(80, 100, 1, 1).data)
    };
  }, bytes.toString('base64'));
  expect(downloaded.width).toBe(160);
  expect(downloaded.height).toBe(120);
  expect(downloaded.top[2]).toBeGreaterThan(200);
  expect(downloaded.bottom[0]).toBeGreaterThan(200);
});

test('rotation preserves quadrant orientation in downloaded output', async ({ page }) => {
  const quadrants = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="80" viewBox="0 0 120 80">
    <rect width="60" height="40" fill="#ff0000"/>
    <rect x="60" width="60" height="40" fill="#00ff00"/>
    <rect y="40" width="60" height="40" fill="#0000ff"/>
    <rect x="60" y="40" width="60" height="40" fill="#ffff00"/>
  </svg>`;
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'rotation-quadrants.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(quadrants)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('.tab-btn[data-tab="transform"]').click();
  await page.locator('#tab-transform .h-rotate[data-angle="90"]').click();
  await applyChanges(page);

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  const decoded = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/octet-stream;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const sample = (x, y) => Array.from(ctx.getImageData(x, y, 1, 1).data);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      topLeft: sample(20, 20),
      topRight: sample(100, 20),
      bottomLeft: sample(20, 60),
      bottomRight: sample(100, 60)
    };
  }, bytes.toString('base64'));

  expect(decoded.width).toBe(80);
  expect(decoded.height).toBe(120);
  // Positive 90-degree rotation should map source top-left red to output top-right,
  // source top-right green to bottom-right, source bottom-left blue to top-left,
  // and source bottom-right yellow to bottom-left.
  expect(decoded.topLeft[2]).toBeGreaterThan(180);
  expect(decoded.topLeft[0]).toBeLessThan(80);
  expect(decoded.topRight[0]).toBeGreaterThan(180);
  expect(decoded.topRight[1]).toBeLessThan(80);
  expect(decoded.bottomLeft[0]).toBeGreaterThan(180);
  expect(decoded.bottomLeft[1]).toBeGreaterThan(180);
  expect(decoded.bottomRight[1]).toBeGreaterThan(180);
  expect(decoded.bottomRight[2]).toBeLessThan(80);
});

