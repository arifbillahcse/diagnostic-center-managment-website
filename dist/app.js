(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const originals = new Map($$('[data-t]').map((element) => [element, element.innerHTML]));
  const bn = {
    navFeatures: 'ফিচার', navWorkflow: 'যেভাবে কাজ করে', navFree: 'কেন ফ্রি?', navFaq: 'জিজ্ঞাসা',
    getStarted: 'ফ্রি শুরু করুন', heroEyebrow: 'ডায়াগনস্টিক সেন্টারের জন্য। মূল সফটওয়্যার ফ্রি।',
    heroLine1: 'কাগজের কাজ কমুক।', heroLine2: 'যত্নের সময় বাড়ুক।',
    heroDescription: 'রোগীর প্রথম ভিজিট থেকে চূড়ান্ত রিপোর্ট পর্যন্ত। বিলিং, প্যাথলজি পরীক্ষা এবং প্রতিদিনের কাজ গুছিয়ে নিন একটি সহজ সিস্টেমে।',
    seeWorkflow: 'কীভাবে কাজ করে দেখুন', freeCore: 'মূল সফটওয়্যার ফ্রি', builtBD: 'বাংলাদেশের জন্য তৈরি',
    heroFootnote: 'আপনার সেন্টারের জন্য নির্দিষ্ট সমাধান।<br>অপ্রয়োজনীয় জটিলতা ছাড়াই।',
    visualCaption: 'রিসেপশন থেকে রিপোর্ট—একটি সংযুক্ত কর্মপরিসর।', builtFor: 'প্রতিদিনের কাজের জন্য পরিকল্পিত',
    pathology: 'প্যাথলজি ল্যাব', diagnosticCenters: 'ডায়াগনস্টিক সেন্টার', imagingReports: 'ইমেজিং ও বিশেষ রিপোর্ট',
    featureEyebrow: 'ছোট ছোট সুবিধা। আরও গোছানো কর্মদিবস।',
    featureHeading: 'সেন্টারের প্রয়োজনীয় কাজ।<br>সব একসঙ্গে।',
    featureIntro: 'রিসেপশন, টেকনিশিয়ান, ডাক্তার এবং হিসাব বিভাগের জন্য একটি সংযুক্ত কার্যপ্রবাহ—ছড়ানো খাতা ও স্প্রেডশিটের ঝামেলা কমাতে।',
    billingTitle: 'বিল পরিষ্কার। হিসাব পরিষ্কার।',
    billingDescription: 'ইনভয়েস তৈরি, আংশিক পেমেন্ট রেকর্ড ও বকেয়া অনুসরণ করুন। প্রতিটি টাকার হিসাব মিলিয়ে দিন শেষ করুন।',
    patientsTitle: 'রোগীকে চিনুন।<br>ইতিহাস রাখুন।',
    patientsDescription: 'নাম, ফোন বা আইডি দিয়ে রোগী খুঁজুন। পুরোনো ভিজিট, পরীক্ষা ও রেফারিং ডাক্তারের তথ্য একসঙ্গে রাখুন।',
    samplesTitle: 'প্রতিটি নমুনার<br>খোঁজ থাকুক।',
    samplesDescription: 'বারকোড লেবেল প্রিন্ট করুন। প্রতিটি পরীক্ষার নমুনা সংগ্রহ, প্রত্যাখ্যান ও পুনঃসংগ্রহ ট্র্যাক করুন।',
    reviewTitle: 'আলাদা যাচাই।<br>প্রক্রিয়ার অংশ।',
    reviewDescription: 'ফলাফল এন্ট্রি, যাচাই ও প্রকাশ আলাদা ধাপে করুন। সংশোধনের কারণ ও আগের সংস্করণ সংরক্ষণ করুন।',
    reportsTitle: 'পেশাদার রিপোর্ট।<br>আপনার সেন্টারের পরিচয়।',
    reportsDescription: 'রেফারেন্স রেঞ্জ ও ফ্ল্যাগসহ প্যাথলজি রিপোর্ট। ইমেজিংয়ের জন্য টেক্সট টেমপ্লেট। নিজস্ব ব্র্যান্ডিংসহ প্রিন্টযোগ্য পিডিএফ।',
    dailyTitle: 'প্রতিদিনের কাজের<br>স্পষ্ট চিত্র।',
    dailyDescription: 'আদায়, বকেয়া, অপেক্ষমাণ পরীক্ষা ও রিপোর্টের সময় দেখুন। নগদ হিসাব মেলান ও প্রয়োজনীয় তথ্য এক্সপোর্ট করুন।',
    bilingual: 'বাংলা ও ইংরেজি', permissions: 'দায়িত্বভিত্তিক অনুমতি', audit: 'কাজের অডিট ইতিহাস', exports: 'CSV ডেটা এক্সপোর্ট',
    workflowEyebrow: 'রিসেপশন থেকে রিপোর্ট হস্তান্তর', workflowHeading: 'একজন রোগী। গোছানো প্রতিটি ধাপ।',
    workflowIntro: 'আলাদা টুল বদলানোর ঝামেলা কমুক। সবার পরবর্তী কাজ হোক পরিষ্কার।',
    stepRegister: 'রেজিস্ট্রেশন ও অর্ডার', stepBill: 'বিল ও পেমেন্ট', stepSample: 'নমুনা ও পরীক্ষা', stepReport: 'যাচাই ও প্রকাশ',
    freeEyebrow: 'ভালো সফটওয়্যার থাকুক হাতের নাগালে', freeHeading: 'প্রতিদিনের প্রয়োজন।<br>মূল সফটওয়্যার ফ্রি।',
    freeIntro: 'একটি ডায়াগনস্টিক সেন্টারের জন্য নির্দিষ্ট সিস্টেম দিয়ে শুরু করুন। বিশেষ সুবিধা যোগ করুন প্রয়োজন হলে।',
    freeNote: 'যাঁরা মানুষের যত্ন নেন,<br>তাঁদের জন্য সহজ একটি শুরু।', coreLabel: 'ফ্রি কোর', oneBranch: 'একটি সক্রিয় শাখা',
    softwareCost: '/ মূল সফটওয়্যার', priceIntro: 'প্রতিদিনের সম্পূর্ণ কার্যপ্রবাহ, এক জায়গায়।',
    pricePatients: 'রোগীর তথ্য ও রেফারিং ডাক্তার', priceBilling: 'টেস্ট অর্ডার, ইনভয়েস, পেমেন্ট ও বকেয়া',
    priceSamples: 'নমুনা ট্র্যাকিং ও বারকোড লেবেল', priceReports: 'প্যাথলজি ও টেক্সটভিত্তিক ইমেজিং রিপোর্ট',
    priceReview: 'যাচাই, সংশোধন ও পিডিএফ প্রিন্ট', priceDaily: 'দৈনিক হিসাব, ড্যাশবোর্ড ও এক্সপোর্ট',
    priceRoles: 'কর্মীদের অনুমতি, অডিট ইতিহাস ও দুই ভাষা', startCenter: 'আপনার সেন্টারের জন্য শুরু করুন',
    pricingDisclaimer: 'হোস্টিং, ইনস্টলেশন, প্রশিক্ষণ ও সাপোর্টের ব্যবস্থা আলাদাভাবে আলোচনা করা হবে।',
    extensionsTitle: 'প্রয়োজনের সঙ্গে বাড়ুক সুবিধা।', extensionsDescription: 'পরিকল্পিত ঐচ্ছিক এক্সটেনশন, ফ্রি কোর থেকে আলাদা।',
    faqEyebrow: 'কিছু সাধারণ জিজ্ঞাসা', faqHeading: 'আপনার প্রশ্ন।<br>পরিষ্কার উত্তর।',
    faqIntro: 'সেন্টারে নতুন সিস্টেম নেওয়ার আগে কিছু বিষয় জেনে নিন।',
    faqQ1: 'সফটওয়্যারটি কি সত্যিই ফ্রি?',
    faqA1: 'হ্যাঁ। একটি ডায়াগনস্টিক সেন্টারের একটি সক্রিয় শাখার জন্য মূল সফটওয়্যার ফ্রি। ঐচ্ছিক এক্সটেনশন আলাদা। ইনস্টলেশন, হোস্টিং, প্রশিক্ষণ ও সাপোর্টের ব্যবস্থা সেটআপের আগে আলোচনা করুন।',
    faqQ2: 'এটি কি পূর্ণাঙ্গ হাসপাতাল ম্যানেজমেন্ট সিস্টেম?',
    faqA2: 'HospitalSoftwere-এর এই সংস্করণ ডায়াগনস্টিক সেন্টারের রোগী রেজিস্ট্রেশন, টেস্ট বিলিং, নমুনা ও রিপোর্টের জন্য নির্দিষ্ট। ফার্মেসি, অ্যাপয়েন্টমেন্ট, ভর্তি রোগী ও হোম কালেকশন v1-এর অন্তর্ভুক্ত নয়।',
    faqQ3: 'আমাদের কর্মীরা কি বাংলায় ব্যবহার করতে পারবেন?',
    faqA3: 'সিস্টেমটি বাংলা ও ইংরেজি ইন্টারফেস, ইউনিকোড রোগীর নাম এবং ব্র্যান্ডেড রিপোর্টে বাংলা ব্যবহারের সুবিধা নিয়ে পরিকল্পিত।',
    faqQ4: 'বিকাশ ও কার্ড পেমেন্ট কি সাপোর্ট করে?',
    faqA4: 'ফ্রি কোরে নগদ, বিকাশ ও কার্ডে পাওয়া পেমেন্ট ম্যানুয়ালি রেকর্ড করা যাবে, আংশিক পেমেন্টসহ। অনলাইন গেটওয়ে দিয়ে স্বয়ংক্রিয় পেমেন্ট যাচাই আলাদা পরিকল্পিত এক্সটেনশন।',
    faqQ5: 'এক্স-রে, আল্ট্রাসাউন্ড ও ইসিজি রিপোর্ট করা যাবে?',
    faqA5: 'ইমেজিং ও বিশেষ পরীক্ষার জন্য টেক্সট টেমপ্লেট রয়েছে, সঙ্গে প্রয়োজনে ছবি বা পিডিএফ সংযুক্তি। PACS, DICOM ও উন্নত মেডিকেল ইমেজ ভিউয়ার এর আওতার বাইরে।',
    faqQ6: 'আমরা কীভাবে শুরু করব?',
    faqA6: 'প্রথমে টেস্টের তালিকা, মূল্য, কর্মীদের দায়িত্ব, সেন্টারের লোগো ও রিপোর্ট ফরম্যাট প্রস্তুত করুন। সেটআপ চেকলিস্ট ডাউনলোড করে ফোন, হোয়াটসঅ্যাপ বা ইমেইলে যোগাযোগ করুন। সাইটের ইন্টারফেসগুলো নমুনা প্রিভিউ।',
    ctaEyebrow: 'নতুন শুরুর প্রথম ধাপ', ctaHeading: 'আপনার ডায়াগনস্টিক সেন্টারে<br>আরও গোছানো কর্মদিবস।',
    ctaDescription: 'টিম, পরীক্ষা ও রিপোর্ট—সব আনুন একসঙ্গে।', planSetup: 'ফ্রি কোর নিয়ে কথা বলুন',
    ctaNote: 'পরিষ্কার একটি শুরু। সফটওয়্যার লাইসেন্স ফি ছাড়া।',
    footerTagline: 'ডায়াগনস্টিক সেন্টারের জন্য পরিকল্পিত।<br>রিসেপশন থেকে রিপোর্ট।',
    footerLocal: 'বাংলাদেশের জন্য তৈরি।<br>আপনার সেন্টারের জন্য প্রস্তুত।', footerRights: 'সর্বস্বত্ব সংরক্ষিত।',
    previewNote: 'প্রোডাক্ট প্রিভিউতে নমুনা তথ্য ব্যবহার করা হয়েছে।',
    setupEyebrow: 'চলুন, সহজভাবে শুরু করি', setupTitle: 'আপনার সেন্টার। আপনার সেটআপ।',
    setupDescription: 'ফ্রি কোর, সেটআপ ও আপনার সেন্টারের প্রয়োজন নিয়ে কথা বলুন। সরাসরি যোগাযোগ করুন, অথবা আগে একটি সেটআপ চেকলিস্ট প্রস্তুত করুন।',
    priorityLabel: 'কোন কাজটি আগে সহজ করতে চান?', priorityAll: 'প্রতিদিনের সম্পূর্ণ কার্যপ্রবাহ',
    priorityBilling: 'বিলিং, পেমেন্ট ও বকেয়া', priorityReports: 'প্যাথলজি ও রিপোর্ট ডেলিভারি', prioritySamples: 'নমুনা ট্র্যাকিং ও লেবেলিং',
    createChecklist: 'আমার সেটআপ চেকলিস্ট তৈরি করুন', checklistReady: 'শুরু করার চেকলিস্ট',
    downloadChecklist: 'চেকলিস্ট ডাউনলোড', checklistNote: 'ইনস্টলেশন আলোচনার জন্য এটি রাখুন। এটি শুধু চেকলিস্ট তৈরি করে; কোনো রিকোয়েস্ট পাঠায় না।',
    callUs: 'ফোন করুন', whatsappUs: 'হোয়াটসঅ্যাপে কথা বলুন', contactLabel: 'সেটআপ ও সফটওয়্যার সম্পর্কে যোগাযোগ করুন',
  };
  let lang = 'en';
  try { if (localStorage.getItem('hospitalsoftwere-language') === 'bn') lang = 'bn'; } catch { /* Browsing without storage is supported. */ }
  let activeStep = 'register';
  let checklist = [];

  const steps = {
    en: {
      register: { label: 'STEP 01 / RECEPTION', title: 'A familiar face.<br>Or a fresh start.', description: 'Find an existing patient in seconds, or register someone new. Add the referring doctor, select tests, and give the visit a clear starting point.', points: ['Unique patient IDs and duplicate warnings', 'Tests, panels, and preparation instructions', 'Patient and referral history, together'] },
      billing: { label: 'STEP 02 / BILLING', title: 'A clear invoice.<br>A traceable payment.', description: 'Create the bill, apply an authorized discount with a reason, and record full or partial payment. Keep the remaining balance visible for the next visit.', points: ['Cash and manually recorded bKash or card payments', 'Original payments preserved through corrections', 'Collections by staff member and daily cash closing'] },
      sample: { label: 'STEP 03 / LABORATORY', title: 'The right sample.<br>The right next step.', description: 'Label each specimen and record who collected it, and when. Follow each test through the lab, with rejection reasons and recollection history kept together.', points: ['Barcode labels linked to the patient and tests', 'Collection and rejection history', 'Tests without specimens bypass sample collection'] },
      report: { label: 'STEP 04 / VERIFICATION', title: 'Reviewed with care.<br>Ready to hand over.', description: 'Enter results, send them for independent verification, and release the approved report. Print a branded PDF and preserve earlier versions when amendments are needed.', points: ['Result entry and verification by different staff', 'Only released results appear in patient reports', 'Amendments keep reasons and version history'] }
    },
    bn: {
      register: { label: 'ধাপ ০১ / রিসেপশন', title: 'পরিচিত রোগী।<br>অথবা নতুন শুরু।', description: 'পুরোনো রোগী খুঁজুন অথবা নতুন রোগী রেজিস্টার করুন। রেফারিং ডাক্তার ও টেস্ট যোগ করে ভিজিটের কাজ শুরু করুন।', points: ['স্বতন্ত্র রোগী আইডি ও ডুপ্লিকেট সতর্কতা', 'টেস্ট, প্যানেল ও প্রস্তুতির নির্দেশনা', 'রোগী ও রেফারেলের ইতিহাস একসঙ্গে'] },
      billing: { label: 'ধাপ ০২ / বিলিং', title: 'বিল পরিষ্কার।<br>পেমেন্টের ইতিহাস অক্ষত।', description: 'বিল তৈরি, কারণসহ অনুমোদিত ছাড় এবং পূর্ণ বা আংশিক পেমেন্ট রেকর্ড করুন। বাকি টাকা পরবর্তী আদায়ের জন্য স্পষ্ট রাখুন।', points: ['নগদ এবং ম্যানুয়াল বিকাশ বা কার্ড রেকর্ড', 'সংশোধনের পরও মূল পেমেন্ট সংরক্ষিত', 'কর্মীভিত্তিক আদায় ও দৈনিক নগদ হিসাব'] },
      sample: { label: 'ধাপ ০৩ / ল্যাবরেটরি', title: 'সঠিক নমুনা।<br>সঠিক পরবর্তী ধাপ।', description: 'প্রতিটি নমুনা লেবেল করুন এবং কখন, কে সংগ্রহ করেছেন তা রাখুন। ল্যাবে টেস্টের অগ্রগতি, প্রত্যাখ্যানের কারণ ও পুনঃসংগ্রহের ইতিহাস দেখুন।', points: ['রোগী ও টেস্টের সঙ্গে সংযুক্ত বারকোড', 'সংগ্রহ ও প্রত্যাখ্যানের ইতিহাস', 'নমুনা লাগে না এমন পরীক্ষায় সংগ্রহ ধাপ নেই'] },
      report: { label: 'ধাপ ০৪ / যাচাই', title: 'যত্নসহ যাচাই।<br>হস্তান্তরের জন্য প্রস্তুত।', description: 'ফলাফল এন্ট্রি করুন, আলাদা কর্মী দিয়ে যাচাই করান এবং অনুমোদিত রিপোর্ট প্রকাশ করুন। ব্র্যান্ডেড পিডিএফ প্রিন্ট করুন এবং সংশোধনে আগের সংস্করণ রাখুন।', points: ['এন্ট্রি ও যাচাই আলাদা কর্মী করবেন', 'শুধু প্রকাশিত ফলাফল রোগীর রিপোর্টে থাকবে', 'সংশোধনের কারণ ও সংস্করণের ইতিহাস সংরক্ষিত'] }
    }
  };

  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const demos = {
    register: `<div class="demo-top">New test order <span class="tag green">Reception</span></div><div class="demo-input">${icon('search')} Search patient name, phone, or ID</div><div class="demo-patient"><span class="patient-avatar mint">AK</span><div><b>Ayesha Khan</b><small>PT-00128 · Female · 32 years</small></div>${icon('check')}</div><span class="demo-label">SELECTED TESTS</span><div class="demo-tests"><span>CBC</span><span>Fasting Blood Sugar</span></div><div class="demo-bottom"><span>Ref. Dr. S. Ahmed</span><span class="demo-action">Continue to billing ${icon('arrow')}</span></div>`,
    billing: `<div class="demo-top">Invoice #INV-00142 <span class="tag amber">Partially paid</span></div><div class="demo-row"><span>Complete Blood Count</span><b>৳500</b></div><div class="demo-row"><span>Blood Glucose (Fasting)</span><b>৳150</b></div><div class="demo-row"><span>Invoice total</span><strong>৳650</strong></div><div class="demo-row"><span>Cash payment recorded</span><b>৳400</b></div><div class="demo-bottom"><span>Remaining due: <b>৳250</b></span><span class="demo-action">Receipt ready ${icon('check')}</span></div>`,
    sample: `<div class="demo-top">Sample collection <span class="tag blue">Collected</span></div><div class="demo-barcode"><b>AYESHA KHAN · PT-00128</b><div class="barcode"></div><small>SP-00142 · WHOLE BLOOD · CBC</small></div><div class="demo-row"><span>Collected by</span><b>Sample collector</b></div><div class="demo-bottom"><span>Linked to order #ORD-00142</span><span class="demo-action">Ready for testing ${icon('check')}</span></div>`,
    report: `<div class="demo-top">Complete Blood Count <span class="tag green">Released</span></div><div class="demo-report-line"><span>PARAMETER</span><span>RESULT</span><span>REFERENCE</span></div><div class="demo-report-line"><span>Hemoglobin</span><strong>13.2 g/dL</strong><span>12.0 – 16.0</span></div><div class="demo-report-line"><span>WBC count</span><strong>7,500 /µL</strong><span>4,000 – 11,000</span></div><div class="demo-row"><span>Independent verification</span><span class="tag green">Complete ✓</span></div><div class="demo-bottom"><span>Version 1 · Illustrative report</span><span class="demo-action">PDF ready ${icon('report')}</span></div>`
  };

  function renderStep(step, focusTab = false) {
    activeStep = step;
    const content = steps[lang][step];
    $('#step-label').textContent = content.label;
    $('#step-title').innerHTML = content.title;
    $('#step-description').textContent = content.description;
    $('#step-points').replaceChildren(...content.points.map((text) => { const li = document.createElement('li'); li.textContent = text; return li; }));
    $('#workflow-demo').innerHTML = demos[step];
    $('#workflow-demo').setAttribute('aria-label', lang === 'bn' ? 'নমুনা তথ্যসহ ইন্টারফেস প্রিভিউ' : 'Illustrative interface with sample data');
    $('#workflow-panel').setAttribute('aria-labelledby', `tab-${step}`);
    $$('[data-step]').forEach((tab) => {
      const selected = tab.dataset.step === step;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (focusTab && selected) tab.focus();
    });
  }

  const checklists = {
    en: {
      base: ['Center name, address, logo, and contact details', 'Staff names and roles for reception, lab, verification, and accounts', 'A backup and restore plan to agree during installation'],
      all: ['Test and panel catalog with prices, units, and reference ranges', 'Current invoice, receipt, and report samples', 'Opening dues and payment methods to discuss before migration'],
      billing: ['Current test prices, discount rules, and invoice format', 'Payment methods, opening dues, and authorized cash collectors', 'Cash opening balance and the process for daily closing'],
      reports: ['Test parameters, units, age/sex reference ranges, and critical limits', 'Pathologist/radiologist roles and independent verification responsibilities', 'Report headers, footers, signatures, and narrative templates'],
      samples: ['Sample types and collection requirements for each test', 'Barcode printer and label size to confirm during setup', 'Collectors, rejection reasons, and recollection procedures']
    },
    bn: {
      base: ['সেন্টারের নাম, ঠিকানা, লোগো ও যোগাযোগের তথ্য', 'রিসেপশন, ল্যাব, যাচাই ও হিসাব বিভাগের কর্মীদের নাম ও দায়িত্ব', 'ইনস্টলেশনে আলোচনার জন্য ব্যাকআপ ও রিস্টোর পরিকল্পনা'],
      all: ['মূল্য, ইউনিট ও রেফারেন্স রেঞ্জসহ টেস্ট ও প্যানেলের তালিকা', 'বর্তমান ইনভয়েস, রসিদ ও রিপোর্টের নমুনা', 'ডেটা স্থানান্তরের আগে বকেয়া ও পেমেন্ট পদ্ধতি নিয়ে আলোচনা'],
      billing: ['টেস্টের বর্তমান মূল্য, ছাড়ের নিয়ম ও ইনভয়েস ফরম্যাট', 'পেমেন্ট পদ্ধতি, আগের বকেয়া ও অনুমোদিত আদায়কারী', 'প্রারম্ভিক নগদ ও দৈনিক হিসাব বন্ধের প্রক্রিয়া'],
      reports: ['টেস্ট প্যারামিটার, ইউনিট, বয়স/লিঙ্গ অনুযায়ী রেঞ্জ ও ক্রিটিক্যাল সীমা', 'প্যাথলজিস্ট/রেডিওলজিস্ট ও আলাদা যাচাইকারীর দায়িত্ব', 'রিপোর্টের হেডার, ফুটার, স্বাক্ষর ও টেক্সট টেমপ্লেট'],
      samples: ['প্রতিটি টেস্টের নমুনার ধরন ও সংগ্রহের নিয়ম', 'সেটআপে নিশ্চিত করার জন্য বারকোড প্রিন্টার ও লেবেলের মাপ', 'সংগ্রহকারী, প্রত্যাখ্যানের কারণ ও পুনঃসংগ্রহের পদ্ধতি']
    }
  };

  function buildChecklist() {
    const items = checklists[lang];
    checklist = [...items.base.slice(0, 2), ...items[$('#setup-priority').value], items.base[2]];
    $('#setup-items').replaceChildren(...checklist.map((text) => { const li = document.createElement('li'); li.textContent = text; return li; }));
    $('#setup-result').hidden = false;
  }

  function setLanguage(value) {
    lang = value;
    document.documentElement.lang = lang;
    originals.forEach((original, element) => { element.innerHTML = lang === 'bn' && bn[element.dataset.t] ? bn[element.dataset.t] : original; });
    $('#language-toggle span').textContent = lang === 'bn' ? 'English' : 'বাংলা';
    $('#language-toggle').setAttribute('aria-label', lang === 'bn' ? 'Switch to English' : 'Switch to Bangla');
    $('#menu-toggle').setAttribute('aria-label', lang === 'bn' ? 'নেভিগেশন খুলুন' : 'Open navigation');
    document.title = lang === 'bn' ? 'HospitalSoftwere — ফ্রি ডায়াগনস্টিক সেন্টার সফটওয়্যার' : 'HospitalSoftwere — Free Diagnostic Center Software';
    try { localStorage.setItem('hospitalsoftwere-language', lang); } catch { /* Language switching also works without local storage. */ }
    renderStep(activeStep);
    if (!$('#setup-result').hidden) buildChecklist();
  }

  $('#language-toggle').addEventListener('click', () => setLanguage(lang === 'en' ? 'bn' : 'en'));
  $$('[data-step]').forEach((tab) => {
    tab.addEventListener('click', () => renderStep(tab.dataset.step));
    tab.addEventListener('keydown', (event) => {
      const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const tabs = $$('[data-step]');
      let index = tabs.indexOf(tab);
      if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else index = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      renderStep(tabs[index].dataset.step, true);
    });
  });
  const nav = $('#main-nav');
  const menuToggle = $('#menu-toggle');
  function closeMenu() { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
  menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  $$('#main-nav a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width: 681px)').addEventListener('change', (event) => { if (event.matches) closeMenu(); });

  const dialog = $('#setup-dialog');
  let dialogTrigger = null;
  $$('[data-setup]').forEach((button) => button.addEventListener('click', () => { dialogTrigger = button; dialog.showModal(); }));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => dialogTrigger?.focus());
  $('#setup-form').addEventListener('submit', (event) => { event.preventDefault(); buildChecklist(); $('#setup-result').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
  $('#setup-priority').addEventListener('change', () => { if (!$('#setup-result').hidden) buildChecklist(); });
  $('#download-checklist').addEventListener('click', () => {
    const heading = lang === 'bn' ? 'HospitalSoftwere — সেটআপ চেকলিস্ট' : 'HospitalSoftwere — Setup checklist';
    const text = `${heading}\n${'='.repeat(42)}\n\n${checklist.map((item, index) => `${index + 1}. ${item}`).join('\n\n')}\n\nContact / যোগাযোগ\nPhone / WhatsApp: +8801779440297\nEmail: emran.alarif8@gmail.com\n\n${lang === 'bn' ? bn.pricingDisclaimer : 'Core software is free for one active branch. Hosting, installation, training, and support are discussed separately.'}\n`;
    const url = URL.createObjectURL(new Blob(['\uFEFF', text], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = `hospitalsoftwere-setup-checklist-${lang}.txt`; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('#year').textContent = new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date());
  setLanguage(lang);
})();
