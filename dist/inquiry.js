const form = document.querySelector('#inquiry-form');
const type = document.querySelector('#inquiry-type');
const reply = document.querySelector('#inquiry-reply');
const phone = document.querySelector('#inquiry-phone');
const email = document.querySelector('#inquiry-email');
const status = document.querySelector('#inquiry-status');
const bn = document.documentElement.lang === 'bn';
form.querySelector('button[type="submit"]').disabled = false;
const requested = new URLSearchParams(location.search).get('intent');
if (['demo','setup','extension','other'].includes(requested)) type.value = requested;
function setReply() {
 const useEmail = reply.value === 'email';
 document.querySelector('#email-field').hidden = !useEmail;
 document.querySelector('#phone-field').hidden = useEmail;
 email.required = useEmail; phone.required = !useEmail;
}
reply.addEventListener('change', setReply); setReply();
form.addEventListener('submit', event => {
 event.preventDefault();
 if (!form.reportValidity()) return;
 const selectedType = type.options[type.selectedIndex].text;
 const selectedReply = reply.options[reply.selectedIndex].text;
 const lines = [
  `${bn?'বিষয়':'Inquiry'}: ${selectedType}`,
  `${bn?'নাম':'Name'}: ${document.querySelector('#inquiry-name').value.trim()}`,
  `${bn?'সেন্টার':'Center'}: ${document.querySelector('#inquiry-center').value.trim()}`,
  `${bn?'উত্তরের মাধ্যম':'Reply method'}: ${selectedReply}`,
  `${bn?'যোগাযোগ':'Contact'}: ${(reply.value === 'email' ? email.value : phone.value).trim()}`,
  `${bn?'জেলা':'District'}: ${document.querySelector('#inquiry-district').value.trim() || '—'}`,
  '', `${bn?'বার্তা':'Message'}:`, document.querySelector('#inquiry-message').value.trim()
 ];
 const subject = `${bn?'HospitalSoftwere সম্পর্কে যোগাযোগ':'HospitalSoftwere inquiry'}: ${selectedType}`;
 const url = `mailto:emran.alarif8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
 status.textContent = bn ? 'আপনার ইমেইল অ্যাপ খুলছে। সেখানে মেসেজটি দেখে পাঠান।' : 'Opening your email app. Review and send the message there.';
 window.location.href = url;
});
