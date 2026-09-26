# PixelResize SEO & Deployment Notes

## Current production architecture

PixelResize is deployed as a static GitHub Pages site. The production SEO architecture uses real `index.html` files for tool routes so crawlers and users can reach the pages without relying on the Express server.

### Static tool routes

- `/tools/image-resizer/`
- `/tools/image-compressor/`
- `/tools/jpg-to-png/`
- `/tools/png-to-jpg/`
- `/tools/jpg-to-webp/`
- `/tools/to-avif/`
- `/tools/to-gif/`
- `/tools/bmp-to-png/`
- `/tools/gif-to-jpg/`
- `/tools/transform/`
- `/compress-image-to-10kb/`
- `/compress-image-to-50kb/`
- `/compress-image-to-100kb/`
- `/compress-image-to-200kb/`
- `/discord-pfp-resizer/`
- `/resize-passport-photo/`
- `/heic-to-jpg/`
- `/crop-image/`
- `/instagram-resizer/`
- `/facebook-resizer/`

Each route contains the existing PixelResize application and loads the existing `script.js` and `style.css` from the site root. Existing image-processing functions were not rewritten.

## SEO safeguards implemented

1. Static route pages now have their own title, description, canonical URL, and English/x-default hreflang.
2. The sitemap lists the working static tool URLs rather than the old SPA-only routes.
3. Tool URL handling preserves trailing-slash canonical URLs.
4. Placeholder VideoObject/SearchAction structured data was removed from the homepage.
5. Placeholder social-profile URLs were removed from Organization structured data.
6. Route Organization structured data now contains only verified site identity fields.
7. The existing tool-processing JavaScript remains shared across the static route pages.

## Important deployment note

`server.ts` is retained in the repository for now, but GitHub Pages does not execute an Express server. The static `index.html` route files are therefore the production routing mechanism.

## Verification

After GitHub Pages finishes deploying, verify a sample of the following URLs returns a normal page rather than the custom 404 flow:

- `/tools/image-resizer/`
- `/tools/image-compressor/`
- `/tools/jpg-to-png/`
- `/compress-image-to-50kb/`
- `/heic-to-jpg/`
- `/instagram-resizer/`
- `/facebook-resizer/`

Do not add additional language versions yet. Multilingual architecture should be planned after the English/static route version is verified.


## Deep Runtime Audit — 2026-09-26

Verified fixes applied without changing the existing UI/design system:
- Removed nondeterministic related-tool ordering from runtime and legacy server code.
- Corrected related-tool URLs so dedicated and target-size routes use their actual static paths.
- Preserved trailing-slash canonical URLs for static tool directories.
- Improved target-size compression with a bounded quality binary search.
- Added safe Blob URL cleanup when replacing/resetting processed images.
- Download filenames now derive the extension from the actual output MIME type.
- Removed unsupported AggregateRating structured data from the legacy server.
- Synchronized static route copy claims with the actual single-image editor behavior.
- Removed unsupported claims about an internal Squoosh-inspired engine.
- Updated sitemap to include verified static information pages and directory-style tool URLs.
- Added static regression checks and an explicit GitHub Pages deployment workflow.

The editor currently processes one selected image at a time. The upload input may accept multiple files, but the active processing pipeline intentionally uses the first selected file; documentation now reflects that behavior rather than claiming batch execution.
