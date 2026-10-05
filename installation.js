(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const entrance = document.querySelector('#entrance');
  const hero = document.querySelector('.hero');
  const site = [...document.querySelectorAll('body > header, body > main, body > footer, body > .skip')];
  const labirinto = entrance.classList.contains('labirinto');
  let nodes = window.createNodeMarks(hero);
  document.addEventListener('languagechange', () => { nodes.stop(); nodes = window.createNodeMarks(hero); });
  let exitTimer, focusTimer, entranceField;

  function lightField(canvas, container, dark) {
    const context = canvas.getContext('2d');
    if (!context) return { stop() {} };
    let width = 0, height = 0, running = true, frame, last = 0, active = true;
    let pointer = { x: .5, y: .5, active: false }, trail = [];
    const particles = Array.from({ length: dark ? 140 : 75 }, (_, i) => ({
      angle: i * 2.39996323, radius: Math.sqrt((i + 1) / (dark ? 140 : 75)), phase: i * .73
    }));
    function resize() {
      width = container.clientWidth; height = container.clientHeight;
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * ratio; canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    const visibility = new IntersectionObserver(entries => { active = entries[0].isIntersecting; }); visibility.observe(container);
    function move(event) {
      const bounds = container.getBoundingClientRect();
      pointer = { x: (event.clientX - bounds.left) / width, y: (event.clientY - bounds.top) / height, active: true };
      trail.push({ x: pointer.x * width, y: pointer.y * height, life: 1 });
      if (trail.length > 45) trail.shift();
      if (!dark) {
        hero.style.setProperty('--art-x', `${(pointer.x - .5) * 24}px`);
        hero.style.setProperty('--art-y', `${(pointer.y - .5) * 18}px`);
        hero.style.setProperty('--digital-x', `${(pointer.x - .5) * -38}px`);
        hero.style.setProperty('--digital-y', `${(pointer.y - .5) * -28}px`);
      } else entrance.style.setProperty('--intro-angle', `${(pointer.x - .5) * 22}deg`);
    }
    function leave() {
      pointer.active = false;
      if (!dark) ['--art-x','--art-y','--digital-x','--digital-y'].forEach(key => hero.style.setProperty(key, '0px'));
    }
    container.addEventListener('pointermove', move, { passive: true });
    container.addEventListener('pointerleave', leave);
    function draw(time) {
      if (!running) return;
      frame = requestAnimationFrame(draw);
      if (!active || document.hidden || time - last < 30) return;
      last = time;
      context.clearRect(0, 0, width, height);
      const clock = time * .00015, size = Math.min(width, height) * (dark ? .4 : .36);
      const cx = width * (dark ? .5 : .61), cy = height * .5;
      const mx = pointer.x * width, my = pointer.y * height;
      const positions = particles.map(p => {
        const angle = p.angle + clock * (dark ? .8 : .25);
        let x = cx + Math.cos(angle) * p.radius * size * (dark ? 1.2 : 1.7);
        let y = cy + Math.sin(angle) * p.radius * size;
        const distance = Math.hypot(x - mx, y - my);
        if (pointer.active && distance < 190) {
          const force = (1 - distance / 190) * .38;
          x += (mx - x) * force; y += (my - y) * force;
        }
        return { x, y, opacity: .15 + Math.sin(clock * 4 + p.phase) * .1 };
      });
      context.lineWidth = .7;
      positions.forEach((p, i) => {
        context.fillStyle = dark ? `rgba(230,230,230,${p.opacity + .3})` : `rgba(210,210,210,${p.opacity})`;
        context.beginPath(); context.arc(p.x, p.y, dark ? 1.5 : 1, 0, Math.PI * 2); context.fill();
        const next = positions[(i + 8) % positions.length];
        if (Math.hypot(p.x - next.x, p.y - next.y) < size * .4) {
          context.strokeStyle = dark ? 'rgba(230,230,230,.075)' : 'rgba(210,210,210,.07)';
          context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(next.x, next.y); context.stroke();
        }
      });
      trail.forEach((p, i) => {
        p.life -= .035;
        if (!i) return;
        context.strokeStyle = dark ? `rgba(240,240,240,${Math.max(0,p.life) * .6})` : `rgba(210,210,210,${Math.max(0,p.life) * .4})`;
        context.lineWidth = dark ? 1.4 : 1;
        context.beginPath(); context.moveTo(trail[i - 1].x, trail[i - 1].y); context.lineTo(p.x, p.y); context.stroke();
      });
      trail = trail.filter(p => p.life > 0);
      if (pointer.active) {
        const gradient = context.createRadialGradient(mx, my, 0, mx, my, dark ? 150 : 110);
        gradient.addColorStop(0, dark ? 'rgba(230,230,230,.16)' : 'rgba(230,230,230,.18)'); gradient.addColorStop(1, 'rgba(230,230,230,0)');
        context.fillStyle = gradient; context.fillRect(0, 0, width, height);
      }
    }
    if (!reduced.matches) frame = requestAnimationFrame(draw);
    return { stop() { running = false; cancelAnimationFrame(frame); observer.disconnect(); visibility.disconnect(); container.removeEventListener('pointermove', move); container.removeEventListener('pointerleave', leave); context.clearRect(0,0,width,height); } };
  }
  let heroField = reduced.matches ? null : lightField(document.querySelector('#hero-field'), hero, false);
  function finishEntrance(event) {
    if (entrance.hidden || entrance.classList.contains('leaving')) return;
    clearTimeout(exitTimer); clearTimeout(focusTimer);
    if (event?.clientX) {
      entrance.style.setProperty('--exit-x', `${event.clientX / innerWidth * 100}%`);
      entrance.style.setProperty('--exit-y', `${event.clientY / innerHeight * 100}%`);
    }
    // Explicit entry always starts at the hero, even after refresh or a fragment URL.
    const entryURL=new URL(location.href);entryURL.hash='';history.replaceState(history.state,'',entryURL);
    window.scrollTo({top:0,left:0,behavior:'instant'});
    document.dispatchEvent(new Event('hero-entry-reset'));
    document.body.classList.remove('intro-running');
    document.body.classList.add('entry-opening');
    entrance.classList.add('leaving');
    const userEntered = event?.type === 'click';
    setTimeout(() => {
      entrance.hidden = true; entranceField?.stop();
      // The overlay is now gone: reset once after layout, then leave scrolling to the visitor.
      window.scrollTo({top:0,left:0,behavior:'instant'});document.dispatchEvent(new Event('hero-entry-reset'));
      document.body.classList.remove('entry-opening');document.body.classList.add('arriving');
      setTimeout(() => document.body.classList.remove('arriving'), 1900);
      site.forEach(element => element.inert = false);
      if (userEntered || entrance.contains(document.activeElement)) document.querySelector('.brand').focus({ preventScroll: true });
    }, reduced.matches ? 0 : 1150);
  }
  function startEntrance() {
    clearTimeout(exitTimer); clearTimeout(focusTimer);
    window.scrollTo({ top: 0, behavior: 'instant' });
    window.AiDiTiMenu?.close();
    entrance.hidden = false; entrance.classList.remove('leaving');
    entrance.style.removeProperty('--exit-x'); entrance.style.removeProperty('--exit-y');
    document.body.classList.remove('arriving','entry-opening'); document.body.classList.add('intro-running');
    site.forEach(element => element.inert = true);
    entranceField?.stop(); entranceField = labirinto ? window.createLabirintoField(document.querySelector('#entrance-field'), entrance) : reduced.matches ? null : lightField(document.querySelector('#entrance-field'), entrance, true);
    focusTimer = setTimeout(() => document.querySelector('#enter').focus({ preventScroll: true }), 100);

  }
  document.querySelector('#enter').addEventListener('click', finishEntrance);
  document.querySelector('#intro-logo').addEventListener('click', finishEntrance);
  function labelIntroLogo(){document.querySelector('#intro-logo').setAttribute('aria-label',({en:'AiDiTi — enter the site',it:'AiDiTi — entra nel sito',fr:'AiDiTi — entrer dans le site'}[document.documentElement.lang]||'AiDiTi — enter the site'));}
  document.addEventListener('languagechange',labelIntroLogo);labelIntroLogo();

  document.querySelector('#replay').addEventListener('click', startEntrance);
  document.querySelectorAll('.brand').forEach(brand => brand.addEventListener('click', event => { event.preventDefault(); if (!entrance.hidden && entrance.classList.contains('leaving')) return; startEntrance(); }));
  reduced.addEventListener('change', () => {
    if (reduced.matches) { if (!labirinto) entranceField?.stop(); heroField?.stop(); document.body.classList.remove('arriving'); }
  });
  startEntrance();
})();
