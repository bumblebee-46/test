/* SHARED ON EVERY PAGE: navigation, reveal, progress bar, back-to-top, enquiry forms and success pop-up */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
(()=>{
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const hd=$('#hd'),bg=$('#bg'),mn=$('#mn');
const sc=()=>hd.classList.toggle('s',scrollY>16);sc();addEventListener('scroll',sc,{passive:true});
const tog=o=>{bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Close menu':'Open menu');mn.classList.toggle('o',o);document.body.style.overflow=o?'hidden':''};
bg.onclick=()=>tog(bg.getAttribute('aria-expanded')!=='true');
$$('#mn a').forEach(a=>a.onclick=()=>tog(false));
$$('#yr').forEach(e=>e.textContent=new Date().getFullYear());
// reveal on scroll
const io='IntersectionObserver'in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.12}):null;
$$('.rv').forEach(el=>io?io.observe(el):el.classList.add('v'));
// progress bar, floating button, back to top
const pg=$('#prog'),fab=$('#fab'),top=$('#top'),ct=$('#contact');let inC=false;
if(ct&&io)new IntersectionObserver(e=>{inC=e[0].isIntersecting;f()}).observe(ct);
function f(){const y=scrollY,m=document.documentElement.scrollHeight-innerHeight;if(pg)pg.style.transform='scaleX('+(m>0?y/m:0)+')';if(fab)fab.classList.toggle('s',y>innerHeight*.8&&!inC);if(top)top.classList.toggle('s',y>innerHeight*1.2)}
addEventListener('scroll',f,{passive:true});f();
if(top)top.onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});
// settings -> page
$$('[data-email]').forEach(a=>{a.href='mailto:'+CONFIG.email;a.textContent=CONFIG.email});
if(CONFIG.commerceUrl)$$('[data-commerce]').forEach(a=>a.href=CONFIG.commerceUrl);
if(CONFIG.whatsapp&&$('#wa')){$('#wa').hidden=false;$('#wal').href='https://wa.me/'+CONFIG.whatsapp;$('#wal').textContent='+'+CONFIG.whatsapp}
if(CONFIG.cfAnalyticsToken){const s=document.createElement('script');s.defer=true;s.src='https://static.cloudflareinsights.com/beacon.min.js';s.setAttribute('data-cf-beacon',JSON.stringify({token:CONFIG.cfAnalyticsToken}));document.head.appendChild(s)}
$$('[data-type]').forEach(a=>a.addEventListener('click',()=>{const s=document.querySelector('select[name=type]');if(s)s.value=a.dataset.type}));
// success / error pop-up
const md=document.createElement('div');md.className='modal';md.setAttribute('role','dialog');md.setAttribute('aria-modal','true');md.setAttribute('aria-labelledby','mdt');
md.innerHTML='<div class="mbox"><div class="mic" aria-hidden="true"></div><h3 id="mdt"></h3><p id="mdp"></p><button class="btn p" type="button" id="mdb">Close</button></div>';document.body.appendChild(md);
let last=null;
const ICON={ok:'<svg viewBox="0 0 32 32"><path d="M7 17l6 6 12-13"/></svg>',err:'<svg viewBox="0 0 32 32"><path d="M9 9l14 14M23 9L9 23"/></svg>',info:'<svg viewBox="0 0 32 32"><path d="M6 9h20v14H6zM6 10l10 8 10-8"/></svg>'};
function pop(kind,title,msg){last=document.activeElement;const b=md.querySelector('.mbox');b.className='mbox '+(kind==='ok'?'':kind);md.querySelector('.mic').innerHTML=ICON[kind];$('#mdt').textContent=title;$('#mdp').innerHTML=msg;md.classList.add('o');$('#mdb').focus()}
const close=()=>{md.classList.remove('o');if(last)last.focus()};
$('#mdb').onclick=close;md.addEventListener('click',e=>{if(e.target===md)close()});
addEventListener('keydown',e=>{if(e.key==='Escape'){close();tog(false)}});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// enquiry forms
$$('form[data-enquiry]').forEach(fm=>{const st=fm.querySelector('.st'),btn=fm.querySelector('[type=submit]');
fm.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(fm);if(fd.get('website'))return;
const d={};for(const k of new Set(fd.keys()))d[k]=fd.getAll(k).join(', ');delete d.website;
const bad=[...fm.querySelectorAll('[required]')].some(el=>!el.value.trim());
if(bad||!/^\S+@\S+\.\S+$/.test(d.email||'')){st.style.color='#f0b46a';st.textContent='Please complete the required fields and use a valid email.';return}
st.textContent='';d.page=location.href;d._subject='New enquiry: '+(d.type||'Website')+' from '+d.name;
const body=Object.entries(d).filter(([k])=>k[0]!=='_'&&k!=='page').map(([k,v])=>k[0].toUpperCase()+k.slice(1)+': '+(v||'-')).join('\n');
if(CONFIG.formEndpoint){const t=btn.textContent;btn.disabled=true;btn.textContent='Sending…';
try{const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0;
fm.reset();pop('ok','Enquiry sent','Thank you, '+esc(d.name)+'. Your enquiry has been received and we will reply to <b>'+esc(d.email)+'</b>.')}
catch{pop('err','Could not send','Something went wrong. Please try again, or email us directly at <a href="mailto:'+CONFIG.email+'">'+CONFIG.email+'</a>.')}
btn.disabled=false;btn.textContent=t;return}
pop('info','One more step','Your email app is opening with your enquiry ready. Press <b>Send</b> there to complete it. If nothing opens, write to <a href="mailto:'+CONFIG.email+'">'+CONFIG.email+'</a>.');
setTimeout(()=>location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent(d._subject)+'&body='+encodeURIComponent(body),400)})});
})();
