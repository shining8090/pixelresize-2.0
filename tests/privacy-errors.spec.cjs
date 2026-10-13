const { test, expect } = require('@playwright/test');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
</svg>`;

test('image processing does not upload image data to a remote host', async ({ page }) => {
  const remoteRequests = [];
  page.on('request', request => {
    const url = request.url();
    // Chromium may send a browser-generated CSP diagnostic report to Google.
    // This report contains security-policy diagnostics, not the image being processed.
    const isBrowserCspReport = url.startsWith('https://csp.withgoogle.com/csp/frame-ancestors/');
    if (!url.startsWith('http://127.0.0.1:8000') && !url.startsWith('http://localhost:8000') && !url.startsWith('data:') && !url.startsWith('blob:') && !url.startsWith('file:') && !isBrowserCspReport) {
      if (['POST', 'PUT', 'PATCH'].includes(request.method())) remoteRequests.push({ method: request.method(), url });
    }
  });

  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'privacy-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/jpeg"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  expect(remoteRequests, 'Image workflow should not send upload-style requests to remote hosts').toEqual([]);
});

test('clicking download before processing does not download an empty file', async ({ page }) => {
  await page.goto('/');
  let downloadCount = 0;
  page.on('download', () => { downloadCount += 1; });

  // Trigger the real button handler without Playwright's pointer/overlay auto-waiting.
  await page.locator('#download-btn').evaluate(button => button.click());
  await page.waitForTimeout(250);
  expect(downloadCount).toBe(0);
});

test('unsupported files are rejected and the editor remains unopened', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'not-an-image.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('this is deliberately not an image')
  });

  await expect(page.locator('#upload-zone')).toBeVisible();
  await expect(page.locator('#processing-ui')).toBeHidden();
  expect(pageErrors).toEqual([]);
});
