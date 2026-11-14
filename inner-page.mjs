// Inner pages use a compact title instead of the home page's large illustrated hero.
export function buildInnerPage(html, page, bn) {
  const title = bn ? page[2] : page[1];
  const home = bn ? '/bn/' : '/';
  const breadcrumbLabel = bn ? 'ব্রেডক্রাম্ব' : 'Breadcrumb';
  const homeLabel = bn ? 'হোম' : 'Home';
  const intro = `<div class="page-heading"><div class="wrap"><nav class="page-crumb" aria-label="${breadcrumbLabel}"><a href="${home}">${homeLabel}</a><span aria-hidden="true">/</span><span aria-current="page">${title}</span></nav><h1>${title}</h1></div></div>`;
  const hero = /<section class="hero">[\s\S]*?<\/section>/;
  if (!hero.test(html)) throw new Error(`Inner-page hero not found: ${page[0]}`);
  return html.replace(hero, intro).replace('<link rel="stylesheet" href="/hero-visual.css">','').replace('</head>','<link rel="stylesheet" href="/inner-page.css"></head>');
}
