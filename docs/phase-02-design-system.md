# Phase 2 — Design system

Visual direction: calm, confident, and practical. The standalone [HTML preview](../dist/design-preview/index.html) presents a home hero, product overview, workflow, and reusable components. Sample patient information is fictional.

## Foundation

- Brand: HospitalSoftwere; compact cross mark and two-tone wordmark.
- Colors: forest `#123e37` for headings and dark surfaces; teal `#087b65` for primary actions; mint `#dcebe0` for supporting surfaces; warm white `#f7f8f2`; body gray-green `#61756e`.
- Typography: system sans-serif with Bengali-capable fallback (`Nirmala UI`); headings use tighter tracking while Bangla retains normal spacing. Body copy targets 16px and comfortable line height.
- Layout: maximum width 1180px, generous section spacing, 12-column desktop planning grid, two columns on tablet, one on mobile. Content collapses naturally and never relies on hover.
- Components: header/navigation, primary and secondary actions, feature cards, workflow steps, badges, product previews, pricing panels, FAQs, contact panels, footer and breadcrumbs.
- Interaction: visible keyboard focus, clear tap targets, semantic headings, descriptive links, accessible menus and status labels. Honor reduced motion when adding animation.

## Page templates

1. **Home:** introduction and product preview; workflow; feature routes; free core; demo/contact.
2. **Product/detail:** breadcrumb and page introduction; alternating explanation and illustration; benefits; role/workflow detail; contextual next step. Use for diagnostic software, pathology, billing, and features.
3. **Demo:** gallery of captioned screenshots or clearly labeled mockups, followed by contact.
4. **Free core/extensions:** a primary scope panel, grouped inclusions, separately labeled planned additions and terms.
5. **Resources:** readable article layouts for onboarding, about, FAQ, and contact; disclosures accessible by keyboard.

The Phase 1 sitemap supplies individual content for all 12 pages. English and Bangla pages preserve the same structure and page-specific language switching. Real screenshots and service terms require confirmation before claims are published.

## Phase 3 handoff

Implement the shared design as reusable HTML/CSS/JavaScript, with separate routes, direct-load support, mobile menu, footer and bilingual navigation. The preview is a design artifact; its links do not represent the complete multi-page website.
