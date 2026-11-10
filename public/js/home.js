/* HOME PAGE: accessible solution tabs. Motion is handled by the shared stylesheet. */
const tabs=$$('.tab'),urls=['dashboard.example','inventory.example','pricing.example','storefront.example','portal.example'];
function pick(i){tabs.forEach((t,j)=>{t.setAttribute('aria-selected',i===j?'true':'false');t.tabIndex=i===j?0:-1;const p=$('#p'+j);if(p){p.hidden=i!==j;p.classList.toggle('o',i===j)}});const url=$('#url');if(url)url.textContent=urls[i]}
tabs.forEach((t,i)=>{t.onclick=()=>pick(i);t.onkeydown=e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();const n=(i+k+tabs.length)%tabs.length;pick(n);tabs[n].focus()}}});


// Subtle floating particles in the hero — warm gold and orange, intentionally restrained.
(()=>{
  const canvas=document.querySelector('#emb');
  const hero=document.querySelector('.hero');
  if(!canvas || !hero || !canvas.getContext) return;
  const reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  const ctx=canvas.getContext('2d');
  if(!ctx) return;
  let width=0,height=0,particles=[],visible=true,raf=0;
  const resize=()=>{
    const rect=hero.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);
    width=Math.max(1,rect.width); height=Math.max(1,rect.height);
    canvas.width=Math.round(width*dpr); canvas.height=Math.round(height*dpr);
    canvas.style.width=width+'px'; canvas.style.height=height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=window.innerWidth<700?24:48;
    particles=Array.from({length:count},()=>({
      x:Math.random()*width,y:Math.random()*height,
      r:.55+Math.random()*1.25,
      vy:.12+Math.random()*.28,
      drift:Math.random()*Math.PI*2,
      alpha:.12+Math.random()*.24,
      gold:Math.random()>.42
    }));
  };
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});
  observer.observe(hero);
  resize();
  window.addEventListener('resize',resize,{passive:true});
  const draw=()=>{
    if(visible && !document.hidden){
      ctx.clearRect(0,0,width,height);
      for(const p of particles){
        p.y-=p.vy; p.drift+=.008;
        p.x+=Math.sin(p.drift)*.16;
        if(p.y<-4){p.y=height+4;p.x=Math.random()*width;}
        const color=p.gold?'233,180,76':'255,122,61';
        ctx.beginPath();
        ctx.fillStyle=`rgba(${color},${p.alpha})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
    }
    raf=requestAnimationFrame(draw);
  };
  raf=requestAnimationFrame(draw);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else raf=requestAnimationFrame(draw);});
})();
