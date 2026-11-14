// Add entrance motion only when it can be observed and the visitor allows it.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || reduceMotion.matches) return;

  const selector = [
    '.section-head', '.offer-heading', '.offer-subhead', '.info-split', '.faq-intro',
    '.hero-inner > div:first-child', '.preview-layout > div:first-child', '.screen',
    '.card', '.home-steps article', '.start-steps article', '.core-panel',
    '.home-core > div:first-child', '.product-item', '.product-note', '.example-layout > div',
    '.product-next > div', '.demo-card', '.demo-walkthrough-inner > div',
    '.offer-card', '.offer-split > div', '.setup-steps article', '.checklist-layout > div',
    '.checklist-card', '.offer-next > *', '.info-values article', '.faq-group',
    '.contact-grid > div', '.contact-inner > div', '.footer > div',
    '.solution-card', '.solution-feature-inner > div', '.solution-steps article'
  ].join(',');
  const items = [...document.querySelectorAll(selector)];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0.03 });

  items.forEach(item => {
    item.classList.add('motion-item');
    observer.observe(item);
  });
  // If the system preference changes while the page is open, reveal everything.
  reduceMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    items.forEach(item => item.classList.add('motion-visible'));
  });
})();
