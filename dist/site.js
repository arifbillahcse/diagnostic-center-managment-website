const toggle = document.querySelector('.mobile-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  navigation.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', document.documentElement.lang === 'bn' ? (open ? 'নেভিগেশন বন্ধ করুন' : 'নেভিগেশন খুলুন') : (open ? 'Close navigation' : 'Open navigation'));
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { document.querySelectorAll('nav details[open]').forEach(item => item.open = false); if (navigation.classList.contains('open')) { setMenu(false); toggle.focus(); } } });
document.addEventListener('click', event => { document.querySelectorAll('nav details[open]').forEach(item => { if (!item.contains(event.target)) item.open = false; }); });
window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
