const chat=document.getElementById('chat');
const input=document.getElementById('input');
const langLabel=document.getElementById('langLabel');
let lastService=null;

function toggleJarvis(){
  const b=document.getElementById('jarvisBox');
  b.style.display = b.style.display==='none' ? 'block' : 'none';
}
function orderService(s){
  document.getElementById('oService').value = s.includes('Logo') ? 'Logo Design - Rs. 4,999' : s.includes('Website') ? 'Website - Rs. 14,999' : s.includes('Instagram') ? 'Instagram Pack - Rs. 2,999' : 'Starter Pack - Rs. 9,999';
  document.getElementById('order').scrollIntoView({behavior:'smooth'});
}
function placeOrder(){
  const n=document.getElementById('oName').value.trim();
  const p=document.getElementById('oPhone').value.trim();
  const s=document.getElementById('oService').value;
  const d=document.getElementById('oDetail').value.trim();
  if(!n || !p){ document.getElementById('orderMsg').textContent='Please enter your Name and WhatsApp Number.'; return; }
  const msg=`Hello IZAX. I want to order.\nName: ${n}\nPhone: ${p}\nService: ${s}\nDetails: ${d}`;
  document.getElementById('orderMsg').textContent='Order noted. Opening WhatsApp to confirm...';
  window.open('https://wa.me/94765207182?text='+encodeURIComponent(msg), '_blank');
}
function addMsg(who,text){
  const d=document.createElement('div');
  d.className='msg '+(who==='JARVIS'?'jarvis':'user');
  d.innerHTML=`<div class="label">${who}</div>${text}`;
  chat.appendChild(d); chat.scrollTop=chat.scrollHeight;
}
function detectLanguage(text){
  const t=text.toLowerCase();
  if(/[\u0D80-\u0DFF]/.test(text)) return 'Sinhala';
  if(/[\u0B80-\u0BFF]/.test(text)) return 'Tamil';
  if(/[\u0900-\u097F]/.test(text)) return 'Hindi';
  if(t.includes('ayubowan')||t.includes('kohomada')||t.includes('one')) return 'Sinhala';
  if(t.includes('vanakkam')||t.includes('venum')) return 'Tamil';
  if(t.includes('namaste')||t.includes('chahiye')) return 'Hindi';
  return 'English';
}
function getReply(text, lang){
  const t=text.toLowerCase();
  if(lang==='Sinhala'){
    if(t.includes('logo')) return "Ayubowan. IZAX eken logo ekak hadanna puluwan. Price Rs. 4,999. Order eka danna kamathi da?";
    if(t.includes('price')) return "Price List: Logo - Rs. 4,999. Website - Rs. 14,999. Instagram Pack - Rs. 2,999.";
    return "Ayubowan. Mama JARVIS. IZAX eke Agent. Oyata logo, website nathnam design ekak one da?";
  }
  if(lang==='Tamil'){
    if(t.includes('logo')) return "Vanakkam. IZAX il logo seiya mudiyum. Price Rs. 4,999. Order seiyyalama?";
    return "Vanakkam. Naan JARVIS. IZAX in Agent. Ungalukku logo, website venuma?";
  }
  if(t.includes('logo')){ lastService='Logo Design'; return "Hello. I am JARVIS, IZAX Agent.\n\nLogo Design - Rs. 4,999\nDelivery: 24 Hours\n\nPlease share your company name and colour. Would you like to order?"; }
  if(t.includes('website')){ lastService='Website'; return "Hello. Website - Rs. 14,999\nDelivery: 2-3 Days\n\nWhat is your business name?"; }
  if(t.includes('price')) return "IZAX Price List:\n\nLogo - Rs. 4,999\nWebsite - Rs. 14,999\nInstagram Pack - Rs. 2,999\nStarter Pack - Rs. 9,999\n\nWhich one do you need?";
  if(t.includes('order')) return "Thank you. To order, please fill the Order Form below. Or share your name and WhatsApp number here.";
  if(t.includes('hi')||t.includes('hello')) return "Hello. I am JARVIS, IZAX Agent.\n\nHow can I help you? Logo, Website, Prices, or Order?";
  return "Thank you. I am JARVIS, IZAX Agent.\n\nI can help with Logo, Website, Prices, Order. What do you need?";
}
function send(){
  const text=input.value.trim(); if(!text) return;
  const lang=detectLanguage(text); langLabel.textContent=lang;
  addMsg('YOU', text); input.value='';
  setTimeout(()=>addMsg('JARVIS', getReply(text, lang)), 400);
}
addMsg('JARVIS', "Hello. I am JARVIS, IZAX Agent.\n\nI am online 24/7.\n\nWhat do you need? Logo, Website, Prices, or Order?");
