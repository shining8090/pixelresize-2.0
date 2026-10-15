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

async function loadFixture(page) {
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);
}

for (const targetKB of [10, 50, 100, 200]) {
  test(`JPG target-size output stays at or below selected ${targetKB} KB`, async ({ page }) => {
    await loadFixture(page);

    // Choose JPG while the Convert panel is visible, then switch to Target.
    // PNG ignores canvas quality settings, so JPG exercises the lossy search path.
    await page.locator('.tab-btn[data-tab="convert"]').click();
    await page.locator('#tab-convert [data-format="image/jpeg"]').click();
    await page.locator('.tab-btn[data-tab="target"]').click();
    await page.locator(`#tab-target [data-target="${targetKB}"]`).click();
    await page.locator('#apply-btn').click();
    await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-btn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.jpg$/i);

    const filePath = await download.path();
    expect(filePath).toBeTruthy();
    const fs = require('fs');
    const output = fs.readFileSync(filePath);
    expect(output.length).toBeGreaterThan(3);
    expect(output[0]).toBe(0xff);
    expect(output[1]).toBe(0xd8);
    expect(output[2]).toBe(0xff);
    expect(output.length).toBeLessThanOrEqual(targetKB * 1024);
  });
}
