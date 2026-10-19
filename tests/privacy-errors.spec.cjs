const { test, expect } = require('@playwright/test');

const privacySentinel = 'PIXELRESIZE_PRIVACY_SENTINEL_20261015';
const fixtureSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240">
  <!-- ${privacySentinel} -->
  <rect width="320" height="240" fill="#174ea6"/>
  <rect x="40" y="30" width="150" height="170" fill="#fbbc04"/>
</svg>`;

function trackExternalRequests(page) {
  const requests = [];
  page.on('request', request => {
    const url = request.url();
    const isLocal = url.startsWith('http://127.0.0.1:8000')
      || url.startsWith('http://localhost:8000')
      || url.startsWith('data:')
      || url.startsWith('blob:')
      || url.startsWith('file:');
    // Ignore Chromium's own CSP diagnostic report; it is browser telemetry, not app image processing.
    const isBrowserCspReport = url.startsWith('https://csp.withgoogle.com/csp/frame-ancestors/');
    // Ignore empty browser telemetry pings; they contain no image payload and are not app uploads.
    const isEmptyBrowserPing = request.resourceType() === 'ping' && !(request.postData() || '');
    // Google AdSense sends a known configuration/measurement POST during the test; it is not an image upload.
    // Keep this exception narrow and do not ignore the request if the privacy sentinel or image data appears.
    const body = request.postData() || '';
    const isKnownAdsTelemetry = url.startsWith('https://pagead2.googlesyndication.com/pagead/ping?e=1')
      && (request.headers()['content-type'] || '').startsWith('text/plain')
      && !body.includes(privacySentinel)
      && !body.includes('data:image/')
      && !url.includes(privacySentinel);
    if (!isLocal && !isBrowserCspReport && !isEmptyBrowserPing && !isKnownAdsTelemetry) {
      requests.push({
        method: request.method(),
        url,
        postData: request.postData() || '',
        resourceType: request.resourceType(),
        headers: request.headers()
      });
    }
  });
  return requests;
}

function expectNoImagePayload(requests, label) {
  const unsafeRequests = requests.filter(request =>
    !['GET', 'HEAD', 'OPTIONS'].includes(request.method)
    || request.postData.length > 0
    || request.url.includes(privacySentinel)
    || request.postData.includes(privacySentinel)
    || Object.values(request.headers).some(value => value.includes(privacySentinel))
    || request.url.includes('data:image/')
  );
  expect(unsafeRequests, label).toEqual([]);
}

test('image processing does not send image payloads to remote hosts', async ({ page }) => {
  const remoteRequests = trackExternalRequests(page);

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

  expectNoImagePayload(remoteRequests, 'Image workflow must not send request bodies or image sentinel data to remote hosts');
});

test('AVIF processing loads its encoder without sending image payloads remotely', async ({ page }) => {
  const remoteRequests = trackExternalRequests(page);

  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'privacy-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);

  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/avif"]').click();
  await page.locator('#apply-btn').click();
  await expect(page.locator('#apply-btn')).toHaveText('Applied!', { timeout: 30000 });

  expectNoImagePayload(remoteRequests, 'AVIF processing may download encoder code, but must not send image payloads remotely');
  expect(remoteRequests.some(request => request.method === 'GET' && request.url.includes('code4fukui.github.io/AVIF/AVIF.js')),
    'AVIF encoder should be fetched as code only').toBe(true);
});

test('AVIF encoder load failure restores the apply button and reports an error', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.route('https://code4fukui.github.io/AVIF/AVIF.js', route => route.abort());

  await page.goto('/');
  await page.locator('#file-input').setInputFiles({
    name: 'privacy-regression-fixture.svg',
    mimeType: 'image/svg+xml',
    buffer: Buffer.from(fixtureSvg)
  });
  await expect(page.locator('#processing-ui')).toBeVisible();
  await expect(page.locator('#main-preview')).toHaveJSProperty('complete', true);
  await page.locator('.tab-btn[data-tab="convert"]').click();
  await page.locator('#tab-convert [data-format="image/avif"]').click();

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#apply-btn').click();

  await expect(page.locator('#apply-btn')).toHaveText('Apply Changes');
  expect(dialogMessage).toContain('Image processing failed.');
  expect(pageErrors).toEqual([]);
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

test('HEIC conversion failure restores the apply button and reports an error', async ({ page }) => {
  await page.route('https://cdn.jsdelivr.net/npm/heic2any@0.0.3/dist/heic2any.min.js', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: 'window.heic2any = async () => { throw new Error("simulated HEIC conversion failure"); };'
    })
  );

  await page.goto('/');
  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await page.locator('#file-input').setInputFiles({
    name: 'broken-photo.heic',
    mimeType: 'image/heic',
    buffer: Buffer.from('invalid HEIC fixture')
  });

  // The editor controls start hidden until a valid image is loaded; verify
  // the failure dialog and ensure the upload screen remains available.
  await expect.poll(() => dialogMessage).toContain('Failed to convert HEIC image.');
  await expect(page.locator('#upload-zone')).toBeVisible();
  await expect(page.locator('#processing-ui')).toBeHidden();
});

test('corrupted image data is rejected and upload UI recovers', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');

  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });

  await page.locator('#file-input').setInputFiles({
    name: 'corrupted-photo.png',
    mimeType: 'image/png',
    buffer: Buffer.from('this is not a valid PNG image')
  });

  await expect.poll(() => dialogMessage).toContain('Could not open this image.');
  await expect(page.locator('#upload-zone')).toBeVisible();
  await expect(page.locator('#processing-ui')).toBeHidden();
  expect(pageErrors).toEqual([]);
});

test('unsupported files show an error and the editor remains unopened', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.goto('/');
  let dialogMessage = '';
  page.once('dialog', async dialog => {
    dialogMessage = dialog.message();
    await dialog.accept();
  });
  await page.locator('#file-input').setInputFiles({
    name: 'not-an-image.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('this is deliberately not an image')
  });

  await expect.poll(() => dialogMessage).toContain('Unsupported file type.');
  await expect(page.locator('#upload-zone')).toBeVisible();
  await expect(page.locator('#processing-ui')).toBeHidden();
  expect(pageErrors).toEqual([]);
});
