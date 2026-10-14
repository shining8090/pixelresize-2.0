const { test, expect } = require('@playwright/test');

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
  await expect(page.locator('#discord-controls')).toBeVisible();
  await expect(page.locator('#tab-resize')).toHaveClass(/active/);
  await expect(page.locator('#resize-w')).toHaveValue('128');
  await expect(page.locator('#resize-h')).toHaveValue('128');
});
