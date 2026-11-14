# HospitalSoftwere marketing website

A responsive marketing website for the free diagnostic center pathology and billing core. This is the customer information website, separate from the diagnostic center application.

## Multi-page rebuild plan

The multi-page rebuild follows [Phase 1 — website structure and content](docs/phase-01-website-plan.md) and the [Phase 2 design system](docs/phase-02-design-system.md). It provides 14 English and 14 Bangla routes with shared navigation, mobile menus, page-preserving language switching, and a shared footer. The Solution page explains website and app development, cloud billing, custom software, AI integration, and pharmacy management. The prior single-page version is retained at `/legacy/`, and the design preview at `/design-preview/`.

See the [Phase 10 launch review](docs/phase-10-launch-review.md) for completed checks and items that must be resolved before public launch.

Edit `generate-pages.mjs` for the shared HTML shell; `home.mjs`, `product-pages.mjs`, `demo-page.mjs`, `offer-pages.mjs`, `info-pages.mjs`, and `solutions-page.mjs` hold page content. The shared animated hero is in `hero-visual.mjs` and `dist/hero-visual.css`; section motion is in `dist/sections-motion.css` and `dist/sections-motion.js`. Run `npm run build` to regenerate the pages. Shared styles and navigation are in `dist/site.css` and `dist/site.js`; page-specific CSS and scripts are also in `dist/`. The contact form prepares a message in the visitor's email application; there is no server-side submission or delivery confirmation.

## Run locally

Requires Node.js 20 or newer. There are no package dependencies to install.

```sh
npm start
```

Open <http://127.0.0.1:4173>. Set `PORT` to use another port. The preview server binds to loopback and serves only `dist/`; it is intended for local development.

```sh
npm run check
npm run check:launch
```

The checks verify page metadata, local assets, anchor targets, JavaScript syntax, all 28 bilingual routes, language links, demo anchors, contact destinations, sitemap, HTTP error handling, and inquiry email-draft logic. They do not replace browser checks for layout, accessibility, mail-app handoff, or real customer interactions.

## Website content

- Diagnostic center software introduction and product preview.
- Patient registration, billing and dues, sample tracking, pathology and narrative reports, verification, and daily closing information.
- Free core and optional extension boundaries.
- Frequently asked questions and demo/contact actions.
- Responsive navigation and accessible interactive controls.

The product preview is illustrative and uses demonstration data. It is not a live connection to diagnostic center records. Feature descriptions reflect the supplied software scope, not an independent certification that the application has shipped.

## Branding and contact configuration

The name is **HospitalSoftwere** (spelling preserved as provided). Customer contact details are:

- Phone: `+8801779440297`
- WhatsApp destination: `https://wa.me/8801779440297`
- Email: `emran.alarif8@gmail.com`

Update occurrences in the files under `dist/` when changing branding or contact details. Keep both displayed text and `tel:`, `mailto:`, and WhatsApp link destinations consistent. Customer messages should contain demo requests only, without patient or medical information.

There is **no lead database, email delivery service, or lead-capture backend**. Contact links hand off to WhatsApp, the visitor's email application, or the device dialer. No message is sent until the visitor completes it in the external application. Do not add a fake success message suggesting a request has been saved or delivered.

## Editing and hosting

`dist/` contains the buildless website and can be edited directly. There is no bundling or build step. Keep page assets inside `dist/`.

The tracked `.openai/hosting.json` identifies the Sites project and declares the static directory. Preserve its project ID when updating this website. A Sites publication uses the exact pushed source and a deployment archive containing the static files and hosting manifest.

The page generator adds canonical URLs, English/Bangla alternate links, social metadata, `sitemap.xml`, and `robots.txt`. It defaults to the current Sites origin. Before deploying to a custom domain, set the `SITE_ORIGIN` environment variable to the public HTTPS origin (without a path), run `npm run build`, and deploy the regenerated output. Preview-only `/legacy/` and `/design-preview/` routes are excluded from the sitemap and search indexing.

To add or update an Add-Ons card, edit the `extensions` list in `offer-pages.mjs`: provide the English and Bangla name and description and select `paid` or `later`, then rebuild. Confirm availability and pricing before changing planned labels.

Pricing content and the software repository link are maintained in `pricing-page.mjs`. The Download button opens the owner's GitHub source repository, which is under development; it is not an installer download.

New Sites hosting is **private by default**. A marketing site must have its audience explicitly changed to public before prospective customers can visit it without owner access. Do not change sharing simply to make a deployment pass.

Before customer launch, confirm current software availability, installation/hosting/support terms, contact details, and the intended public audience. The free core does not imply free hosting or support, and optional extensions should be labeled according to their actual availability.
