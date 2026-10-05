(() => {
  const header=document.querySelector('body>header'),nav=header.querySelector('nav'),button=document.querySelector('#menu');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 900px)');
  let open=false;
  function close(){open=false;nav.classList.remove('open');document.body.classList.remove('menu-open');document.body.style.overflow='';button.setAttribute('aria-expanded','false');button.setAttribute('aria-label',AiDiTiI18n.t('openNavigation'));button.textContent='☰';document.querySelector('main').inert=false;document.querySelector('footer').inert=false;}
  function show(){open=true;nav.classList.add('open');document.body.classList.add('menu-open');document.body.style.overflow='hidden';button.setAttribute('aria-expanded','true');button.setAttribute('aria-label',AiDiTiI18n.t('closeNavigation'));button.textContent='✕';document.querySelector('main').inert=true;document.querySelector('footer').inert=true;nav.querySelector('a').focus();}
  window.AiDiTiMenu={close};button.onclick=()=>open?close():show();
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(open)close();}));
  document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){close();button.focus();}if(e.key==='Tab'){const targets=[...header.querySelectorAll('a,button')].filter(el=>el.getClientRects().length),first=targets[0],last=targets.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  mobile.addEventListener('change',()=>{if(!mobile.matches&&open)close();});
  function scroll(){header.classList.toggle('scrolled',scrollY>70);}addEventListener('scroll',scroll,{passive:true});scroll();
  document.addEventListener('languagechange',()=>button.setAttribute('aria-label',AiDiTiI18n.t(open?'closeNavigation':'openNavigation')));
  function scene(canvas,container,isMenu){
    const ctx=canvas.getContext('2d');if(!ctx)return;let w=0,h=0,last=0,p={x:.5,y:.5},target={x:.5,y:.5};
    function resize(){w=container.clientWidth;h=container.clientHeight;const d=Math.min(devicePixelRatio||1,2);canvas.width=w*d;canvas.height=h*d;ctx.setTransform(d,0,0,d,0,0);paint(0);}
    new ResizeObserver(resize).observe(container);
    container.addEventListener('pointermove',e=>{if(reduced.matches)return;const r=container.getBoundingClientRect();target={x:(e.clientX-r.left)/w,y:(e.clientY-r.top)/h};},{passive:true});
    container.addEventListener('pointerleave',()=>target={x:.5,y:.5});
    function paint(t){ctx.fillStyle='#14151d';ctx.fillRect(0,0,w,h);p.x+=(target.x-p.x)*.04;p.y+=(target.y-p.y)*.04;const cx=w*(.6+(p.x-.5)*.12),cy=h*(.48+(p.y-.5)*.12),size=Math.min(w,h)*.7;
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,size);g.addColorStop(0,'#61569488');g.addColorStop(.5,'#21495555');g.addColorStop(1,'#14151d00');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation='lighter';for(let ring=0;ring<14;ring++){const radius=size*(.15+ring*.065),angle=t*.000025*(ring%2?1:-1)+ring*.17;const points=[];for(let j=0;j<7;j++){const a=angle+j*Math.PI*2/7;points.push({x:cx+Math.cos(a)*radius,y:cy+Math.sin(a)*radius*.7});}ctx.strokeStyle=`rgba(174,183,235,${.09+ring*.003})`;ctx.lineWidth=.7;ctx.beginPath();points.forEach((pt,j)=>j?ctx.lineTo(pt.x,pt.y):ctx.moveTo(pt.x,pt.y));ctx.closePath();ctx.stroke();points.forEach(pt=>{ctx.fillStyle='#c7e1ff99';ctx.beginPath();ctx.arc(pt.x,pt.y,1.4,0,Math.PI*2);ctx.fill();});}ctx.globalCompositeOperation='source-over';}
    function tick(t){requestAnimationFrame(tick);if(reduced.matches||document.hidden||(isMenu?!open:document.body.classList.contains('intro-running')||open||scrollY>container.offsetHeight)||t-last<40)return;last=t;paint(t);}resize();requestAnimationFrame(tick);
  }
  scene(document.querySelector('#hero-scene'),document.querySelector('.hero'),false);scene(document.querySelector('#menu-field'),nav,true);
})();
