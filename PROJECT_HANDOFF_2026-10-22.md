# PixelResize Project Handoff — Updated 2026-10-25

## Purpose
Continue the existing PixelResize deep forensic audit. Do not restart the audit or assume the site is complete. This document replaces the stale October 22 status and records the latest audit state as of October 25, 2026.

## Repository and branches
- Repository: https://github.com/shining8090/pixelresize-2.0
- Working/audit branch: `seo-tool-logic-fix-2026-10-07`
- Production branch: `main`
- Main application: static HTML/CSS/JavaScript hosted on GitHub Pages.
- Live site: https://pixelresize.site/
- Production `main` base SHA checked during this audit: `1ce139238822e50940172a96897dbd4e6a9c02bd`.
- Audit branch base SHA checked during this audit, before this documentation update: `6fd6905201184196737dc1578620b6eca471f803`.
- GitHub comparison at that point: audit branch was **256 commits ahead and 0 behind** `main`; no open PR was found.
- The main branch metadata inspected showed no branch protection / required status checks.
- **Do not merge the audit branch wholesale.** It is far ahead of production and needs scoped review.
- This update is documentation only. Do not change app code, merge, or deploy without explicit approval.

## Mandatory workflow
**CI → Inspect → Fix confirmed defect → Re-run → Verify → Next task**

- Work on one logical audit/fix item at a time.
- Verify the real GitHub Actions run and exact commit before saying PASS.
- If CI is queued or running, stop and wait; do not commit again while it is running.
- If CI fails, inspect the actual logs first. Separate test setup/assertion errors from real application defects.
- Make only targeted, evidence-backed changes. Do not redesign or refactor unrelated code.
- Never use fake results or claim a test passed without real verification.
- User prefers simple English and short, step-by-step instructions.
- Never merge or deploy without explicit approval.
- Preserve static HTML/CSS/JavaScript and GitHub Pages hosting; do not introduce a required runtime server.
- Preserve the 50 MB input cap and 16,384-pixel / 40-million-pixel output safeguards unless a confirmed reason justifies a change.

## Latest confirmed CI status
- **CI #140 — PASS** on the audit-branch base commit `6fd6905201184196737dc1578620b6eca471f803`, dated 2026-10-23: https://github.com/shining8090/pixelresize-2.0/actions/runs/39999332525.
- **CI #126 — PASS** after JPEG transparency fix: https://github.com/shining8090/pixelresize-2.0/actions/runs/39835458794.
- **CI #125 — FAIL** originally exposed the JPEG transparency/background regression: https://github.com/shining8090/pixelresize-2.0/actions/runs/39828836919.
- Fix commit `e1c36f25e2804aabc0338339719d067aeef6d98f` adds white-background compositing for JPEG export: https://github.com/shining8090/pixelresize-2.0/commit/e1c36f25e2804aabc0338339719d067aeef6d98f.
- The JPEG fix is on the audit branch, not production `main`.
- The image-regression workflow is configured for audit-branch pushes or manual dispatch. Configured CI passing does **not** prove that every audit finding is fixed or that live production has been fully tested in Chromium.
- The GitHub Actions / branch facts above describe the checked state before this handoff documentation commit. Re-check the latest run and branch SHA when resuming.

## Prioritized forensic findings

Status key: **Confirmed** means established from source, workflow/test configuration, or CI record. **Risk / verify** means real browser or live response evidence is still required.

| Priority | Finding | Status and evidence | Required next action |
|---|---|---|---|
| P1 | Target-size compression can report success when the output exceeds the requested limit | Confirmed source defect on production `main`: fallback can use the lowest-quality Blob without checking the final byte count before normal success/download flow. Audit-branch encoder has a `fitsTarget` check. | Treat as the first repair item. Assert final Blob size is within the requested ceiling; if impossible, show clear failure and do not present a successful download. Test 10/20/50/100/200/500 KB where offered, exact boundaries, tiny/large images and impossible targets. |
| P1 | JPEG transparency may export with black background | Confirmed defect in `main`; regression caught by CI #125. Commit `e1c36f25` adds white-background compositing; CI #126 passed on audit branch. | Isolate the minimal fix and its regression test. Verify actual downloaded JPG pixels in Chromium on the intended production candidate. |
| P1 | Selected output format may not match actual output bytes | Confirmed source risk: production uses canvas `toBlob()` with requested MIME but does not validate the returned Blob type. Unsupported types may fall back to PNG. | Validate returned MIME and file signature before marking success or choosing extension. Add explicit GIF/BMP checks. |
| P1 | Dedicated GIF tool route may omit its encoder | Confirmed audit-branch wiring gap: `tools/to-gif/index.html` loads `script.js` but not `gif-encoder.js`, while shared script expects `GifWriter`. Existing GIF tests exercise the homepage route. | Add route-level regression test; ensure the dedicated tool route loads the encoder; test the actual downloaded GIF in Chromium. |
| P1 | Multi-file selection does not equal batch processing | Confirmed production source mismatch: homepage input allows `multiple`, but `handleFiles(files)` processes only `files[0]`; no complete multi-result/download queue exists. Some copy implies one-image-at-a-time while other UI suggests bulk operation. | Decide explicitly: implement full batch results/download/error handling, or remove `multiple` and bulk-support claims consistently. |
| P1 | Security policy is permissive; deployment does not configure response headers | Confirmed configuration weakness: CSP includes broad `https:`, `unsafe-inline` and `unsafe-eval`; meta `X-Frame-Options` / `X-Content-Type-Options` do not substitute for HTTP response headers. The deployment workflow uploads static files and has no custom-header setup. Actual live response headers were not verified. | Measure real live response headers using Chromium/network tools first. Then design a supported header approach and tighten CSP incrementally with regression tests. Do not claim production headers are missing until measured. |
| P1 | Keyboard-accessibility gaps in editor controls | Confirmed source gap: crop handles are non-focusable `div` elements with pointer-based controls; the mobile menu checkbox is hidden with `display:none` while a label serves as the visible trigger. | Make crop and navigation controls keyboard-operable, with visible focus and appropriate labels/announcements. Test keyboard paths and screen-reader behavior. |
| P1 | Some text/control colors fail common contrast thresholds | Contrast calculated from stylesheet values: `#647FBC` on white ≈ 3.96:1; white on `#647FBC` ≈ 3.96:1; `#94B8A3` on white ≈ 2.18:1; `#A2BDF2` on white ≈ 1.89:1. Normal text generally needs 4.5:1 and large text 3:1. This is source color math, not a full rendered-page scan. | Review and darken insufficient colors as needed; run a complete contrast check over rendered routes and states. |
| P2 | Sitemap URLs and canonical URLs disagree | Confirmed source mismatch: information/legal pages such as about/privacy/terms/contact/authors/editorial-policy/changelog use clean-path canonicals but sitemap entries use `.html` URLs. | Choose one URL format and align canonical tags, sitemap entries and internal links. Add an automated consistency check. |
| P2 | Production sitemap omits blog listing page | Confirmed source mismatch: production `main` sitemap has 31 URLs and omits `/blog.html`; audit branch sitemap has 32 and includes it. | Include the route if it is intended to be indexed; validate all sitemap entries and canonical equality. |
| P2 | Clean routes depend on JavaScript in `404.html` | Risk / verify: clean paths such as `/about` are mapped to `.html` pages after a 404 page executes JavaScript. A fetcher observed a 404 for `/about`, but end-to-end browser/CDN status was not confirmed here. | In Chromium, record HTTP status, redirects/final URL, content, canonical and console output for every clean route. Prefer true successful routes/redirects where hosting allows. |
| P2 | HEIC dependency is loaded on pages that may not need it | Confirmed dependency/performance concern: pages include `heic2any@0.0.3`, while lockfile records `0.0.4`. | Standardize version and load HEIC code only when needed; retest HEIC conversion and failure recovery. |
| P2 | Vite lockfile version needs a security patch review | Lockfile records Vite `6.4.2`. The identified official advisories list versions through `6.4.3` as affected and `6.4.4` as patched. This is development tooling, not proof that the live static website is exploitable. Sources: https://github.com/vitejs/vite/security/advisories/GHSA-9jrq-w75r-8gcw and https://www.cve.org/CVERecord?id=CVE-2026-112946. | Re-check the official advisory feed immediately before updating; patch to a fixed compatible release and run development/build/test checks. |
| P2 | Existing tests leave route and accessibility coverage gaps | Confirmed test gap: mobile checks cover overflow at six widths and click navigation; they do not cover keyboard behavior/contrast. GIF tests use homepage, privacy tests mostly use homepage, and static audit does not consistently validate canonical equality or crawl links. | Expand tests over dedicated routes, keyboard use, labels, contrast, privacy/network behavior, canonical/sitemap equality and link status. |
| P2 | CI is not a required main-branch release gate | Confirmed configuration gap: branch metadata indicated `main` is unprotected with no required checks; image regression is not configured as a required PR gate. | For scoped reviewed changes, require relevant static and browser checks before production merge. |
| P3 | Small-screen tool headings may be too small | Confirmed CSS: tool-card headings drop to 10px at max-width 480px and descriptions are hidden; the real usability impact needs visual testing. | Inspect at 320px and 375px, including enlarged text/system fonts, and adjust for legibility. |
| P3 | Crop geometry after viewport/orientation changes is not proven | Risk / verify: crop dimensions appear to be captured at initialization, and no resize observer was identified in reviewed code. | Test resize/orientation changes and rotate-before-crop/crop-after-rotate; assert output pixel mapping. |
| P3 | Target-size dimension fallback may change aspect ratio on edge dimensions | Risk / verify: audit-branch fallback uses `Math.max(64, floor(width*scale))` and the same approach for height, which can affect images with a side already below 64px. | Test extreme panoramas, tall images and small dimensions; preserve aspect ratio if intended. |
| P3 | No measured performance baseline was found | Confirmed test-coverage gap: workflows do not establish Lighthouse/resource/performance budgets. Source byte counts are not real network transfer/runtime measurements. | Measure Chromium load, bytes, resource count, editor-ready time and conversion latency before optimizing. |

## Confirmed versus not yet reproduced

### Confirmed from source, configuration, tests, or CI
- CI #125 exposed the JPEG transparency/background regression; audit-branch fix commit and CI #126 PASS are recorded above.
- Production target-size flow does not validate the final Blob byte size against the requested ceiling.
- Production conversion does not validate the actual returned Blob MIME before success/download.
- Audit-branch dedicated GIF page has an encoder wiring gap relative to shared script expectations.
- Multi-file input and first-file-only processing conflict.
- Canonical/sitemap format mismatches and production `/blog.html` omission.
- Source accessibility gaps for crop handles, labels and mobile navigation.
- Contrast ratios calculated from source colors.
- Permissive CSP configuration, no custom response-header setup in deploy workflow, and the identified test-coverage gaps.
- HEIC dependency pin mismatch and Vite lockfile version requiring review.

### Requires Chromium or live-response verification
- Actual downloaded output MIME/signature for GIF/BMP and other conversion paths.
- Dedicated GIF route behavior in the browser.
- Exact security headers delivered by the live host/CDN.
- Actual status, rendering and redirect behavior for clean routes such as `/about`.
- Whether untested external requests can expose image data; current privacy tests do not prove zero leakage across every route and representation.
- Real production performance, resource loading, memory behavior and browser console errors.
- Crop behavior after viewport/orientation changes and rare-dimension edge cases.
- Full rendered-page contrast, keyboard and screen-reader behavior.

## Required next actions (one logical task at a time)
1. Inspect and isolate the **production target-size output validation** issue and the exact tests already present. Define a scoped change and regression cases before editing application code.
2. Only with explicit authorization, make the targeted fix on the audit branch; run the relevant tests and verify the actual GitHub Actions run/commit. Do not touch production `main`.
3. Continue the prioritized P1 items, one at a time: JPEG transparency, output MIME/signature, dedicated GIF wiring, multi-file behavior decision, security headers/CSP evidence, accessibility and contrast.
4. Continue SEO route/canonical/sitemap checks, then privacy and dependency checks.
5. After audit fixes are complete, perform the required final Chromium pass against **live production separately from the audit branch**. Do not call the site audited or production-ready before this is done.
6. No merge or deployment without explicit approval.

## Required final Chromium verification checklist
- Core image tools and actual downloaded bytes/pixels, not preview alone.
- Target-size presets available on each route: 10/20/50/100/200/500 KB as applicable; exact limit boundaries, unreachable targets, tiny/large images.
- Resize, crop, rotate, flip, JPEG alpha compositing and format-signature checks for GIF/AVIF/BMP/JPEG/PNG/WebP as supported.
- Viewports: 320, 375, 390, 768, 1024 and 1440 CSS pixels; enlarged text and keyboard navigation.
- Browser console/page errors and failed requests.
- External network requests during conversion and privacy-sensitive flows across dedicated routes.
- Actual HTTP response security headers.
- All intended SEO routes, status/redirect behavior, canonicals, sitemap entries and internal links.
- Record exact tested commit/URL, browser, result and any limitations.

## Start prompt for the next session
Continue my PixelResize forensic audit from `PROJECT_HANDOFF_2026-10-22.md` in repository https://github.com/shining8090/pixelresize-2.0, branch `seo-tool-logic-fix-2026-10-07`. Read the current handoff first and re-check the branch head and latest GitHub Actions run. The forensic register dated 2026-10-25 is summarized here. The next task is to inspect production target-size output validation and existing regression tests, then propose a minimal scoped fix. Do not edit application code unless I explicitly authorize it. Work one issue at a time: CI → Inspect → Fix confirmed defect → Re-run → Verify → Next task. Never claim PASS without the actual run. Do not merge or deploy without my approval. Final Chromium verification of live production remains required.
