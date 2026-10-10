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

  // Resize inputs live inside the Resize tab; switch back before filling them.
  // The crop rectangle is retained by the crop engine across tab changes.
  await page.locator('.tab-btn[data-tab="resize"]').click();
  await page.locator('#resize-w').fill('256');
  await page.locator('#resize-h').fill('256');
  await page.locator('#maintain-ratio').uncheck();

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
});
