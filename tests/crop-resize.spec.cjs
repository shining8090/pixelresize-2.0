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

test('crop handle dragged past image edges remains within crop preview bounds', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'crop-boundary-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await page.locator('.tab-btn[data-tab="crop"]').click();
  await page.locator('#aspect-ratio-presets [data-ratio="1"]').click();

  const handle = page.locator('#crop-box .handle-se');
  const bounds = await handle.boundingBox();
  expect(bounds).toBeTruthy();
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width / 2 + 2000, bounds.y + bounds.height / 2 + 2000, { steps: 5 });
  await page.mouse.up();

  const geometry = await page.evaluate(() => {
    const box = document.getElementById('crop-box');
    const preview = document.getElementById('crop-preview-img');
    return {
      x: parseFloat(box.style.left),
      y: parseFloat(box.style.top),
      width: parseFloat(box.style.width),
      height: parseFloat(box.style.height),
      previewWidth: preview.clientWidth,
      previewHeight: preview.clientHeight
    };
  });
  expect(geometry.x).toBeGreaterThanOrEqual(0);
  expect(geometry.y).toBeGreaterThanOrEqual(0);
  expect(geometry.x + geometry.width).toBeLessThanOrEqual(geometry.previewWidth + 1);
  expect(geometry.y + geometry.height).toBeLessThanOrEqual(geometry.previewHeight + 1);
  // A locked 1:1 crop must remain square when the handle reaches image edges.
  expect(Math.abs(geometry.width - geometry.height)).toBeLessThanOrEqual(1);
  expect(pageErrors).toEqual([]);
});


test('crop after rotation and flips produces a valid image without browser errors', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'crop-transform-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('.tab-btn[data-tab="crop"]').click();
  await page.locator('#rotate-right').click();
  await page.locator('#flip-h').click();
  await page.locator('#aspect-ratio-presets [data-ratio="1"]').click();

  const cropImage = page.locator('#crop-preview-img');
  await expect.poll(() => cropImage.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.locator('#crop-box')).toBeVisible();

  await page.locator('.tab-btn[data-tab="resize"]').click();
  await page.locator('#maintain-ratio').uncheck();
  await page.locator('#resize-w').fill('256');
  await page.locator('#resize-h').fill('256');
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const preview = page.locator('#main-preview');
  await expect.poll(() => preview.evaluate(img => img.naturalWidth)).toBe(256);
  await expect.poll(() => preview.evaluate(img => img.naturalHeight)).toBe(256);
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

test('crop rectangle coordinates map to the correct output pixels', async ({ page }) => {
  const quadrantSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="100" height="100" fill="#ff0000"/>
    <rect x="100" width="100" height="100" fill="#00ff00"/>
    <rect y="100" width="100" height="100" fill="#0000ff"/>
    <rect x="100" y="100" width="100" height="100" fill="#ffff00"/>
  </svg>`;
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'crop-coordinate-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(quadrantSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('.tab-btn[data-tab="crop"]').click();
  await page.locator('#aspect-ratio-presets [data-ratio="1"]').click();

  // Place a deterministic 80x80 crop fully inside the top-left red quadrant.
  await page.evaluate(() => {
    const box = document.getElementById('crop-box');
    const preview = document.getElementById('crop-preview-img');
    const scaleX = preview.clientWidth / 200;
    const scaleY = preview.clientHeight / 200;
    box.style.left = '10px';
    box.style.top = '10px';
    box.style.width = '80px';
    box.style.height = '80px';
    box.dataset.auditCrop = JSON.stringify({ scaleX, scaleY });
  });

  // Use the actual rendered crop geometry but make output pixel dimensions explicit.
  await page.locator('.tab-btn[data-tab="resize"]').click();
  await page.locator('#maintain-ratio').uncheck();
  await page.locator('#resize-w').fill('80');
  await page.locator('#resize-h').fill('80');
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const result = await page.locator('#main-preview').evaluate(img => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
      topLeft: Array.from(ctx.getImageData(20, 20, 1, 1).data),
      bottomRight: Array.from(ctx.getImageData(60, 60, 1, 1).data)
    };
  });

  expect(result.width).toBe(80);
  expect(result.height).toBe(80);
  expect(result.topLeft[0]).toBeGreaterThan(200);
  expect(result.topLeft[1]).toBeLessThan(40);
  expect(result.topLeft[2]).toBeLessThan(40);
  expect(result.bottomRight[0]).toBeGreaterThan(200);
  expect(result.bottomRight[1]).toBeLessThan(40);
  expect(result.bottomRight[2]).toBeLessThan(40);
  expect(pageErrors).toEqual([]);
});

