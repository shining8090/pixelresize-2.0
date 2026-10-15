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
 
const seoToolRoutes = [
  { slug: 'image-compressor', title: /Image Compressor Online|Professional Image Compressor Online/i, tab: 'compress' },
  { slug: 'jpg-to-png', title: /JPG to PNG Converter/i, tab: 'convert', format: 'image/png' },
  { slug: 'png-to-jpg', title: /PNG to JPG Converter/i, tab: 'convert', format: 'image/jpeg' },
  { slug: 'jpg-to-webp', title: /JPG to WebP Converter|Convert JPG to WebP/i, tab: 'convert', format: 'image/webp' },
  { slug: 'to-avif', title: /Convert Image to AVIF|Convert to AVIF/i, tab: 'convert', format: 'image/avif' },
  { slug: 'to-gif', title: /Convert Image to GIF|Convert JPG to GIF/i, tab: 'convert', format: 'image/gif' },
  { slug: 'bmp-to-png', title: /BMP to PNG Converter|Convert BMP to PNG/i, tab: 'convert', format: 'image/png' },
  { slug: 'gif-to-jpg', title: /GIF to JPG Converter|Convert GIF to JPG/i, tab: 'convert', format: 'image/jpeg' },
  { slug: 'transform', title: /Online Image Transform Tool/i, tab: 'transform' }
];

for (const route of seoToolRoutes) {
  test(`direct SEO route /tools/${route.slug}/ preserves its URL and selects the expected tool`, async ({ page }) => {
    await page.goto(`/tools/${route.slug}/`);

    await expect(page).toHaveURL(new RegExp(`/tools/${route.slug}/$`));
    await expect(page).toHaveTitle(route.title);

    const expectedCanonical = "https://pixelresize.site/tools/" + route.slug + "/";
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedCanonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", expectedCanonical);

    // SEO routes should expose non-empty search and social metadata.
    for (const selector of ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]']) {
      const content = await page.locator(selector).getAttribute('content');
      expect(typeof content === 'string' && content.trim().length > 0, `${selector} should have non-empty content`).toBe(true);
    }

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(typeof robots === 'string' && robots.trim().length > 0, 'robots meta tag should have non-empty content').toBe(true);
    expect(robots.toLowerCase()).not.toContain('noindex');

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(typeof viewport === 'string' && viewport.trim().length > 0, 'viewport meta tag should have non-empty content').toBe(true);
    expect(viewport).toMatch(/width\s*=\s*device-width/i);

    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(typeof charset === 'string' && charset.trim().length > 0, 'document charset should be declared').toBe(true);
    expect(charset.toLowerCase()).toBe('utf-8');

    const lang = await page.locator('html').getAttribute('lang');
    expect(typeof lang === 'string' && lang.trim().length > 0, 'html lang attribute should be present').toBe(true);
    expect(lang).toMatch(/^[a-z]{2,3}(?:-[A-Za-z0-9]+)*$/);

    const title = await page.title();
    expect(title.trim().length, 'document title should not be blank').toBeGreaterThan(0);

    expect(title.trim().length, 'document title should not be excessively long').toBeLessThanOrEqual(70);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description.trim().length, 'meta description should not be blank').toBeGreaterThan(0);
    expect(description.trim().length, 'meta description should not be excessively long').toBeLessThanOrEqual(320);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(typeof ogTitle === 'string' && ogTitle.trim().length > 0, 'Open Graph title should not be blank').toBe(true);
    expect(ogTitle.trim().length, 'Open Graph title should not be excessively long').toBeLessThanOrEqual(100);

    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(typeof ogDescription === 'string' && ogDescription.trim().length > 0, 'Open Graph description should not be blank').toBe(true);
    expect(ogDescription.trim().length, 'Open Graph description should not be excessively long').toBeLessThanOrEqual(320);

    const canonicalUrl = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalUrl).toMatch(/^https:\/\/pixelresize\.site\//);
    expect(canonicalUrl).not.toMatch(/[?#]/);

    const breadcrumbJson = await page.locator('#schema-breadcrumb').textContent();
    const breadcrumbData = JSON.parse(breadcrumbJson);
    expect(breadcrumbData['@type']).toBe('BreadcrumbList');
    expect(breadcrumbData.itemListElement.length).toBeGreaterThanOrEqual(2);
    expect(breadcrumbData.itemListElement[0].item).toBe('https://pixelresize.site/');
    expect(breadcrumbData.itemListElement.every(item => item['@type'] === 'ListItem'
      && Number.isInteger(item.position) && item.position > 0
      && typeof item.name === 'string' && item.name.length > 0
      && typeof item.item === 'string' && item.item.startsWith('https://pixelresize.site/'))).toBe(true);
    expect(breadcrumbData.itemListElement.map(item => item.position)).toEqual(
      breadcrumbData.itemListElement.map((_, index) => index + 1)
    );

    const faqJson = await page.locator('#schema-faq').textContent();
    const faqData = JSON.parse(faqJson);
    expect(faqData['@type']).toBe('FAQPage');
    expect(faqData.mainEntity.length).toBeGreaterThan(0);
    expect(faqData.mainEntity.every(item => item['@type'] === 'Question'
      && typeof item.name === 'string' && item.name.length > 0
      && item.acceptedAnswer && item.acceptedAnswer['@type'] === 'Answer'
      && typeof item.acceptedAnswer.text === 'string' && item.acceptedAnswer.text.length > 0)).toBe(true);

    const howToJson = await page.locator('#schema-howto').textContent();
    const howToData = JSON.parse(howToJson);
    expect(howToData['@type']).toBe('HowTo');
    expect(howToData.step.length).toBe(4);
    expect(howToData.step.every(step => step['@type'] === 'HowToStep'
      && typeof step.name === 'string' && step.name.length > 0
      && typeof step.text === 'string' && step.text.length > 0)).toBe(true);

    await expect(page.locator(`.tab-btn[data-tab="${route.tab}"]`)).toHaveClass(/active/);

    if (route.format) {
      await expect(page.locator(`#tab-convert .btn-chip[data-format="${route.format}"]`)).toHaveClass(/active/);
    }
  });
}


const directRouteCases = [
  { path: '/discord-pfp-resizer/', title: /Discord PFP Resizer/i, mode: 'mode-discord-pfp-resizer' },
  { path: '/resize-passport-photo/', title: /Resize Passport Photo Online/i, mode: 'mode-resize-passport-photo' },
  { path: '/heic-to-jpg/', title: /HEIC to JPG Converter/i, mode: 'mode-heic-to-jpg' },
  { path: '/crop-image/', title: /Image Cropper|Crop Images Online/i, tab: 'crop' },
  { path: '/instagram-resizer/', title: /Instagram Photo Resizer/i, tab: 'resize' },
  { path: '/facebook-resizer/', title: /Facebook Image Resizer/i, tab: 'resize' },
  { path: '/compress-image-to-10kb/', title: /Compress Image to 10KB/i, target: '10' },
  { path: '/compress-image-to-100kb/', title: /Compress Image to 100KB/i, target: '100' },
  { path: '/compress-image-to-200kb/', title: /Compress Image to 200KB/i, target: '200' }
];

for (const route of directRouteCases) {
  test(`direct route ${route.path} selects its expected tool`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page).toHaveURL(new RegExp(route.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'));
    await expect(page).toHaveTitle(route.title);

    const expectedCanonical = "https://pixelresize.site" + route.path;
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", expectedCanonical);

    if (route.mode) {
      await expect(page.locator('body')).toHaveClass(new RegExp(route.mode));
    }
    if (route.tab) {
      await expect(page.locator(`.tab-btn[data-tab="${route.tab}"]`)).toHaveClass(/active/);
    }
    if (route.target) {
      await expect(page.locator('#tab-target')).toHaveClass(/active/);
      await expect(page.locator(`#tab-target [data-target="${route.target}"]`)).toHaveClass(/active/);
    }
  });
}
