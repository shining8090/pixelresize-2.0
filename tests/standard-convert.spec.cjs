const { test, expect } = require('@playwright/test');
const fs = require('fs');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
  <circle cx="230" cy="120" r="60" fill="#ea4335"/>
</svg>`;

const formats = [
  { mime: 'image/jpeg', extension: 'jpg', signature: bytes => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
  { mime: 'image/png', extension: 'png', signature: bytes => bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { mime: 'image/webp', extension: 'webp', signature: bytes => bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP' }
];

for (const format of formats) {
  test(`${format.extension.toUpperCase()} conversion downloads a valid file`, async ({ page }) => {
    await page.goto('/');
    await page.locator('#file-input').setInputFiles({
      name: 'standard-conversion-fixture.svg',
      mimeType: 'image/svg+xml',
      buffer: Buffer.from(fixtureSvg)
    });
    await expect(page.locator('#processing-ui')).toBeVisible();
    await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);

    await page.locator('.tab-btn[data-tab="convert"]').click();
    await page.locator(`#tab-convert [data-format="${format.mime}"]`).click();
    await page.locator('#apply-btn').click();
    await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-btn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename().toLowerCase().endsWith(`.${format.extension}`)).toBe(true);

    const filePath = await download.path();
    expect(filePath).toBeTruthy();
    const bytes = fs.readFileSync(filePath);
    expect(bytes.length).toBeGreaterThan(20);
    expect(format.signature(bytes)).toBe(true);

    // A correct file signature alone does not prove the downloaded image decodes
    // or preserves the expected dimensions and visible source content.
    const decoded = await page.evaluate(async base64 => {
      const image = new Image();
      image.src = `data:image/octet-stream;base64,${base64}`;
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
}

test('JPG to PNG conversion preserves transparent-free color pixels and dimensions', async ({ page }) => {
  const fixture = `<svg xmlns="http://www.w3.org/2000/svg" width="73" height="41" viewBox="0 0 73 41">
    <rect width="73" height="41" fill="#16803c"/>
    <rect x="20" y="10" width="30" height="20" fill="#f0c020"/>
  </svg>`;
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'png-conversion-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixture)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/png"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#download-btn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/\.png$/i);
  const filePath = await download.path();
  expect(filePath).toBeTruthy();
  const bytes = fs.readFileSync(filePath);
  expect(bytes.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

  const pixels = await page.evaluate(async base64 => {
    const image = new Image();
    image.src = `data:image/png;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    return {
      width: image.naturalWidth,
      height: image.naturalHeight,
      background: Array.from(ctx.getImageData(5, 5, 1, 1).data),
      inset: Array.from(ctx.getImageData(30, 20, 1, 1).data)
    };
  }, bytes.toString('base64'));

  expect(pixels.width).toBe(73);
  expect(pixels.height).toBe(41);
  expect(pixels.background[1]).toBeGreaterThan(100);
  expect(pixels.inset[0]).toBeGreaterThan(180);
  expect(pixels.inset[1]).toBeGreaterThan(120);
  expect(pixels.inset[2]).toBeLessThan(100);
  expect(pageErrors).toEqual([]);
});

