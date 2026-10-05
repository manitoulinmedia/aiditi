(() => {
 const hero=document.querySelector('.motion-hero');if(!hero)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const groups=[['h1','left'],['.hero-top','left'],['.hero-art','left'],['.hero-digital','right'],['.hero-note','left'],['.hero-bottom p','left'],['.hero-bottom a','right']];
 groups.forEach(([selector,edge])=>hero.querySelector(selector)?.setAttribute('data-scroll-edge',edge));
 hero.classList.add('hero-scroll');let frame=0;
 function paint(){
  frame=0;
  const progress=reduced.matches||document.body.classList.contains('intro-running')?0:Math.max(0,Math.min(1,(-hero.getBoundingClientRect().top/hero.offsetHeight-.035)/.9));
  const eased=progress*progress*(3-2*progress);
  hero.style.setProperty('--hero-opacity',String(1-eased));
  hero.style.setProperty('--hero-distance',Math.min(innerWidth*.28,480)*eased+'px');
  hero.style.setProperty('--hero-rise',-18*eased+'px');
  hero.dataset.scrollProgress=progress.toFixed(3);hero.classList.toggle('hero-away',progress>=.96);
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(paint);}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 reduced.addEventListener('change',schedule);new ResizeObserver(schedule).observe(hero);paint();
})();
