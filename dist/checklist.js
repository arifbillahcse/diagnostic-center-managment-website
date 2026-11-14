const checklistForm = document.querySelector('#setup-checklist');
const prioritySelect = document.querySelector('#priority');
const checkboxes = [...checklistForm.querySelectorAll('input[type="checkbox"]')];
const statusMessage = document.querySelector('#checklist-message');
const isBangla = document.documentElement.lang === 'bn';
prioritySelect.addEventListener('change', () => {
  checkboxes.forEach(input => { input.checked = prioritySelect.value === 'all' || input.dataset.category === 'all' || input.dataset.category === prioritySelect.value; });
  statusMessage.textContent = isBangla ? 'প্রস্তাবিত বিষয় নির্বাচন করা হয়েছে; প্রয়োজনে পরিবর্তন করুন।' : 'Suggested items selected; adjust them as needed.';
});
checklistForm.addEventListener('submit', event => {
  event.preventDefault();
  const items = checkboxes.filter(input => input.checked).map(input => input.nextElementSibling.textContent.trim());
  if (!items.length) { statusMessage.textContent = isBangla ? 'অন্তত একটি বিষয় নির্বাচন করুন।' : 'Select at least one item.'; return; }
  const title = isBangla ? 'HospitalSoftwere — সেটআপ চেকলিস্ট' : 'HospitalSoftwere — Setup checklist';
  const note = isBangla ? 'সফটওয়্যারের ফ্রি কোর একটি সক্রিয় শাখার জন্য। সেটআপ ও সাপোর্টের ব্যবস্থা আলাদাভাবে আলোচনা করা হবে।' : 'Core software is free for one active branch. Setup and support arrangements are discussed separately.';
  const body = `${title}\n========================================\n\n${items.map((item, i) => `${i+1}. ${item}`).join('\n')}\n\n${note}\n\nPhone / WhatsApp: +8801779440297\nEmail: emran.alarif8@gmail.com\n`;
  const url = URL.createObjectURL(new Blob(['\uFEFF',body], {type:'text/plain;charset=utf-8'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `hospitalsoftwere-setup-${isBangla?'bn':'en'}.txt`; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url),1000);
  statusMessage.textContent = isBangla ? 'চেকলিস্ট ডাউনলোড শুরু হয়েছে। কোনো অনুরোধ পাঠানো হয়নি।' : 'Your checklist download has started. No inquiry was sent.';
});
