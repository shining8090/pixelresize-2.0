const { test, expect } = require('@playwright/test');

const viewports = [
  { name: 'small mobile 320px', width: 320, height: 740 },
  { name: 'mobile 375px', width: 375, height: 812 },
  { name: 'mobile 390px', width: 390, height: 844 },
  { name: 'tablet 768px', width: 768, height: 1024 },
  { name: 'desktop 1024px', width: 1024, height: 768 },
  { name: 'desktop 1440px', width: 1440, height: 900 }
];

for (const viewport of viewports) {
  test(`page has no horizontal overflow at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth
    }));

    expect(
      dimensions.documentWidth,
      `Document overflows horizontally: ${JSON.stringify(dimensions)}`
    ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
    expect(
      dimensions.bodyWidth,
      `Body overflows horizontally: ${JSON.stringify(dimensions)}`
    ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
  });
}

test('mobile navigation toggle opens and closes the menu', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');

  const toggle = page.locator('#nav-toggle');
  const label = page.locator('label[for="nav-toggle"]');
  await expect(label).toBeVisible();
  await label.click();
  await expect(toggle).toBeChecked();

  await page.locator('.nav-link[href="#tools"]').click();
  await expect(toggle).not.toBeChecked();
});
