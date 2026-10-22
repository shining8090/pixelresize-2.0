# PixelResize Project Handoff — 2026-10-22

## Purpose
Continue the existing PixelResize forensic audit. Do not restart the audit or assume the site is complete.

## Repository and branch
- Repository: https://github.com/shining8090/pixelresize-2.0
- Working branch: `seo-tool-logic-fix-2026-10-07`
- Main application: static HTML/CSS/JavaScript hosted on GitHub Pages.
- Live site: https://pixelresize.site/
- Do not merge, deploy, or change production without explicit approval.

## Mandatory workflow
**CI → Inspect → Fix confirmed defect → Re-run → Verify → Next task**

- Work on one logical audit item at a time.
- Verify the real GitHub Actions run and exact commit before saying PASS.
- If CI is queued or running, stop and wait; do not commit again while it is running.
- If CI fails, inspect the actual logs first. Separate test setup/assertion errors from real application defects.
- Make only a targeted, evidence-backed change. Do not redesign or refactor unrelated code.
- Do not use fake results or claim a test passed without real verification.
- User prefers simple English and short, step-by-step instructions.
- Never merge or deploy without explicit approval.

## Latest confirmed CI status
### CI #125 — FAIL
- Run: https://github.com/shining8090/pixelresize-2.0/actions/runs/39828836919
- Run ID: `39828836919`
- Commit: `5478cb94`
- Title: `Test JPEG transparency background handling`
- The workflow reached the JPG/PNG/WebP regression stage and failed there. Subsequent AVIF, BMP, privacy/error, mobile-layout and route/preset stages were skipped.
- Log identifies failing test: `tests/standard-convert.spec.cjs:226`, “JPEG conversion produces an opaque image from transparent input”.
- Assertion around line 272 expected a sampled channel to be >220 but received 0. The test comment expects transparent source pixels to export as white because JPEG has no alpha channel.
- **Next action: inspect the full test and current JPEG conversion implementation before deciding whether this is a test coordinate/setup problem or an actual black-background conversion defect. Do not guess or change app code before inspecting.**
- CI #124 PASS: https://github.com/shining8090/pixelresize-2.0/actions/runs/39668979966 — PNG transparency-preservation regression passed, with all 19 workflow steps successful.
- CI #123 PASS: https://github.com/shining8090/pixelresize-2.0/actions/runs/39668046477 — rotation quadrant/orientation regression passed, all 19 steps successful.
- CI #122 FAIL was a test-coordinate error (sample point outside the rotated 80×120 output); corrected in CI #123.
- CI #121 PASS: https://github.com/shining8090/pixelresize-2.0/actions/runs/39666515407 — vertical flip pixel accuracy passed, all 19 steps successful.
- CI #120 PASS: https://github.com/shining8090/pixelresize-2.0/actions/runs/39665500214 — AVIF external encoder-load failure recovery passed, all 19 steps successful.
- CI #118 and #117 were superseded AVIF failure tests that incorrectly tried to trigger an AVIF failure through canvas `toBlob()`; the AVIF path uses a remote encoder module. The correct test intercepts `https://code4fukui.github.io/AVIF/AVIF.js`.

## Audit areas already investigated and regression-tested
Historical work completed and verified by CI includes:
- Target-size compression must report failure rather than success if it cannot meet the requested size.
- Crop/resize validation, output dimension/pixel limits, aspect-ratio input handling, crop boundary handling and crop pixel mapping.
- Error recovery when the external AVIF encoder fails.
- HEIC conversion result validation and error recovery.
- Corrupt/unreadable image handling, unsupported file validation, 50 MB input cap, and output dimension limits.
- GIF palette/transparency/color handling and gradient behavior.
- BMP row padding and row orientation.
- PNG and WebP downloaded-output pixel fidelity.
- Horizontal/vertical flip pixel checks, 90° rotation dimensions and quadrant orientation.
- PNG transparent pixel preservation (CI #124 PASS).

These tests passing does **not** prove every tool, browser, device, or edge case is fully audited.

## Current forensic audit queue
1. **Resolve CI #125 JPEG transparency/background failure** — current blocker.
2. Continue image-conversion integrity audit with targeted tests for actual downloaded output, not preview alone.
3. Continue checking crop/rotate/flip combinations and exact pixel alignment where not yet proven.
4. Revisit compression edge cases, especially exact target-size boundaries and impossible targets.
5. Review privacy and external dependencies; no claim of zero image leakage based only on limited regression coverage.
6. After forensic audit is complete, perform the required final Chromium verification:
   - Core image tools
   - Target-file-size compression edge cases
   - Mobile and desktop responsiveness
   - Browser console/page errors
   - Relevant SEO checks
7. Only after these checks are actually completed may the audit/site be called complete.

## Project constraints
- Preserve existing UI and site design.
- Do not merge, deploy, or alter production without approval.
- Static website deployment target remains GitHub Pages; avoid introducing a runtime server requirement for the website itself.
- Be careful with external libraries/requests, including the remote AVIF encoder and HEIC library.
- The 50 MB input cap and 16,384-pixel / 40-million-pixel output limits were introduced as safeguards; do not change them without a confirmed reason.

## Start prompt for the new chat
Paste this into a new chat:

> Continue my PixelResize forensic audit using the handoff file `PROJECT_HANDOFF_2026-10-22.md`. Repository: https://github.com/shining8090/pixelresize-2.0, branch: `seo-tool-logic-fix-2026-10-07`. First inspect the current GitHub Actions status and then investigate CI #125 FAIL: https://github.com/shining8090/pixelresize-2.0/actions/runs/39828836919. The failing test is in `tests/standard-convert.spec.cjs`, “JPEG conversion produces an opaque image from transparent input”; a sampled channel expected >220 but received 0. Inspect the full test and current JPEG conversion code before deciding whether the test or app is wrong. Work one issue at a time: CI → Inspect → Fix confirmed defect → Re-run → Verify → Next task. Never claim PASS without verifying the actual run. Do not merge, deploy, redesign, or change unrelated code without my approval. After the forensic audit is complete, run the required Chromium checks for core tools, target-size edge cases, mobile/desktop responsiveness, browser errors, and SEO.
