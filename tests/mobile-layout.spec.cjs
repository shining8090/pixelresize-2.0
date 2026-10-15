const { test, expect } = require('@playwright/test');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
</svg>`;

async function expectNoHorizontalOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth
  }));

  expect(
    dimensions.documentWidth,
    `${label}: document overflows horizontally: ${JSON.stringify(dimensions)}`
  ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
  expect(
    dimensions.bodyWidth,
    `${label}: body overflows horizontally: ${JSON.stringify(dimensions)}`
  ).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
}

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

    await expectNoHorizontalOverflow(page, 'Landing page');

    // Also test the editor state: a page can fit before upload but overflow
    // when tool controls and the image preview become visible.
    await page.locator('#file-input').setInputFiles({
      name: 'mobile-layout-fixture.svg',
      mimeType: 'image/svg+xml',
      buffer: Buffer.from(fixtureSvg)
    });
    await expect(page.locator('#processing-ui')).toBeVisible();
    await expectNoHorizontalOverflow(page, 'Image editor');
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
