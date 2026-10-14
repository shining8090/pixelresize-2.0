const { test, expect } = require('@playwright/test');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
</svg>`;

test('direct JPG-to-WebP route selects the Convert tab and WebP format', async ({ page }) => {
  await page.goto('/?tool=jpg-to-webp');

  await expect(page.locator('#tab-convert')).toHaveClass(/active/);
  await expect(page.locator('#tab-convert [data-format="image/webp"]')).toHaveClass(/active/);
  await expect(page.locator('#breadcrumb-current-nav')).toHaveText(/Jpg To Webp|JPG to WebP/i);
});

test('direct 50KB route selects Target tab and 50KB preset', async ({ page }) => {
  await page.goto('/?tool=compress-image-to-50kb');

  await expect(page.locator('#tab-target')).toHaveClass(/active/);
  await expect(page.locator('#tab-target [data-target="50"]')).toHaveClass(/active/);
  await expect(page.locator('#breadcrumb-current-nav')).toHaveText(/Compress to 50KB/i);
});

test('direct Discord preset opens the dedicated mode with 128x128 dimensions', async ({ page }) => {
  await page.goto('/?tool=discord-pfp-resizer');

  await expect(page.locator('body')).toHaveClass(/mode-discord-pfp-resizer/);

  // The preset controls live inside the editor, which stays hidden until an image is selected.
  await page.locator('#file-input').setInputFiles({
    name: 'route-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#discord-controls')).toBeVisible();
  await expect(page.locator('#tab-resize')).toHaveClass(/active/);
  await expect(page.locator('#resize-w')).toHaveValue('128');
  await expect(page.locator('#resize-h')).toHaveValue('128');
});

test('direct image-resizer SEO route preserves its URL and selects the Resize tool', async ({ page }) => {
  await page.goto('/tools/image-resizer/');

  await expect(page).toHaveURL(/\/tools\/image-resizer\/$/);
  await expect(page).toHaveTitle(/Resize Image Online Free/i);
  await expect(page.locator('#tab-resize')).toHaveClass(/active/);
});
