# Phase 10 — launch review

Reviewed 14 November 2026. The site is deployed as an owner-private preview. It is not yet verified for public customer launch.

## Checks completed

- Regenerated all 24 English and Bangla marketing pages.
- `check.mjs` passed: page metadata, local assets, links and anchors, and JavaScript syntax.
- `launch-check.mjs` passed against the local HTTP server: all 24 routes and their language counterparts, contact destinations, demo preview sections, page headings, canonical and language metadata, sitemap, 404 response, traversal rejection, and unsupported-method response.
- The launch check exercised inquiry type selection, required reply-method selection, and mailto draft construction in an isolated JavaScript simulation. It did not send a message or open a mail application.
- The private Sites deployment must be checked separately for its returned deployment status.

## Items remaining before public launch

1. **Real browser review:** inspect desktop and mobile layouts in English and Bangla, navigate by keyboard, test disclosure controls and download, and verify the email handoff. The browser access host was unavailable during this review.
2. **Product availability:** confirm which planned software features have shipped, and adjust product copy and mockup labels if needed. No real screenshots, live demo, customer claims, or service guarantees should be invented.
3. **Service arrangements:** confirm installation, hosting, training, and support terms before making specific promises. Current copy says these are discussed separately.
4. **Inquiry delivery:** the current contact form opens a draft in the visitor's own email app. It does not submit, store, or confirm delivery. Confirm this is acceptable or implement and verify server-side delivery with a configured provider.
5. **Public access and domain:** the existing Site is private. Change the audience only when public access is explicitly requested. If a custom public domain is selected, rebuild with `SITE_ORIGIN` set to that HTTPS origin, then verify canonical and sitemap URLs.
6. **Policies:** the Phase 1 plan includes privacy and terms pages for launch. Their contents depend on actual hosting, inquiry handling, data retention, and service arrangements; no placeholder promises have been published.

These checks do not establish legal compliance, accessibility conformance, delivery of an email, or a performance score. Complete the relevant browser and operational checks before declaring launch complete.
