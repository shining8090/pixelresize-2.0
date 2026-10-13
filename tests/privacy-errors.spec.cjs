const { test, expect } = require('@playwright/test');

const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
</svg>`;

test('image processing does not upload image data to a remote host', async ({ page }) => {
  const remoteRequests = [];
  page.on('request', request => {
    const url = request.url();
    if (!url.startsWith('http://127.0.0.1:8000') && !url.startsWith('http://localhost:8000') && !url.startsWith('data:') && !url.startsWith('blob:') && !url.startsWith('file:')) {
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
  const downloadPromise = page.waitForEvent('download', { timeout: 1000 }).catch(() => null);
  await page.locator('#download-btn').click();
  expect(await downloadPromise).toBeNull();
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
