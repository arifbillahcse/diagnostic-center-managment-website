// Decorative workflow illustration shared by the English and Bangla page heroes.
export function buildHeroVisual(html, bn) {
  const t = (en, ba) => bn ? ba : en;
  const art = `<div class="hero-art" role="img" aria-label="${t('Illustration of a connected diagnostic center workflow','ডায়াগনস্টিক সেন্টারের সংযুক্ত কার্যপ্রবাহের চিত্র')}">
    <div class="art-grid" aria-hidden="true"></div><div class="art-orbit art-orbit-one" aria-hidden="true"></div><div class="art-orbit art-orbit-two" aria-hidden="true"></div>
    <div class="art-spark art-spark-one" aria-hidden="true">✳</div><div class="art-spark art-spark-two" aria-hidden="true">✦</div>
    <div class="art-panel"><div class="art-panel-top"><span class="art-logo" aria-hidden="true">✚</span><span>HospitalSoftwere</span><span class="art-top-dots" aria-hidden="true">•••</span></div>
      <div class="art-panel-body"><div class="art-overline">${t('YOUR CENTER, CONNECTED','আপনার সেন্টারের সব কাজ একসঙ্গে')}</div><div class="art-title">${t('From visit to report','ভিজিট থেকে রিপোর্ট')}</div><div class="art-subtitle">${t('A clearer path for every team.','প্রতিটি টিমের জন্য গোছানো কাজ।')}</div>
        <div class="art-track"><div class="art-track-line" aria-hidden="true"></div>
          <div class="art-step"><span class="art-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20v-1.4a6.5 6.5 0 0 1 13 0V20"/></svg></span><span>${t('Patient','রোগী')}</span></div>
          <div class="art-step"><span class="art-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v18l-2.5-1.7L12 21l-2.5-1.7L7 21V3Zm3 5h4m-4 4h4"/></svg></span><span>${t('Billing','বিলিং')}</span></div>
          <div class="art-step"><span class="art-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6l-4 6a4 4 0 0 0 3.3 6h5.4a4 4 0 0 0 3.3-6l-4-6V3M8 15h8"/></svg></span><span>${t('Sample','নমুনা')}</span></div>
          <div class="art-step"><span class="art-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6"/></svg></span><span>${t('Report','রিপোর্ট')}</span></div>
        </div><div class="art-footer"><span class="art-status-dot" aria-hidden="true"></span>${t('A connected workflow','একটি সংযুক্ত কার্যপ্রবাহ')}</div>
      </div></div>
    <div class="art-float art-float-sample"><span class="art-float-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 3h6M10 3v6l-4 6a4 4 0 0 0 3.3 6h5.4a4 4 0 0 0 3.3-6l-4-6V3M8 15h8"/></svg></span><span><b>${t('Sample tracking','নমুনা ট্র্যাকিং')}</b><small>${t('Collection to lab','সংগ্রহ থেকে ল্যাব')}</small></span></div>
    <div class="art-float art-float-report"><span class="art-float-icon art-float-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg></span><span><b>${t('Review & release','যাচাই ও প্রকাশ')}</b><small>${t('A clear next step','পরবর্তী ধাপ স্পষ্ট')}</small></span></div>
    <span class="art-caption">${t('ILLUSTRATIVE WORKFLOW','কার্যপ্রবাহের কল্পিত চিত্র')}</span></div>`;
  const before = /<div class="visual">[\s\S]*?<\/div><\/div><\/section>(?=<section)/;
  if (!before.test(html)) throw new Error('Shared hero visual not found; generation stopped.');
  return html.replace(before, `${art}</div></section>`).replace('</head>', '<link rel="stylesheet" href="/hero-visual.css"></head>');
}
