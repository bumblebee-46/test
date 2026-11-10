/* HOME PAGE: accessible solution tabs. Motion is handled by the shared stylesheet. */
const tabs=$$('.tab'),urls=['dashboard.example','inventory.example','pricing.example','storefront.example','portal.example'];
function pick(i){tabs.forEach((t,j)=>{t.setAttribute('aria-selected',i===j?'true':'false');t.tabIndex=i===j?0:-1;const p=$('#p'+j);if(p){p.hidden=i!==j;p.classList.toggle('o',i===j)}});const url=$('#url');if(url)url.textContent=urls[i]}
tabs.forEach((t,i)=>{t.onclick=()=>pick(i);t.onkeydown=e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();const n=(i+k+tabs.length)%tabs.length;pick(n);tabs[n].focus()}}});
