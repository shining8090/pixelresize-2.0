const { test, expect } = require('@playwright/test');

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
});

test('90-degree rotation swaps the output width and height', async ({ page }) => {
  await loadFixture(page);
  await page.locator('.tab-btn[data-tab="transform"]').click();
  await page.locator('#tab-transform .h-rotate[data-angle="90"]').click();
  await applyChanges(page);

  const preview = page.locator('#main-preview');
  await expect.poll(async () => preview.evaluate(img => img.naturalWidth)).toBe(240);
  await expect.poll(async () => preview.evaluate(img => img.naturalHeight)).toBe(320);
});
