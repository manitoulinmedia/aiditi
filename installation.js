(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const entrance = document.querySelector('#entrance');
  const hero = document.querySelector('.hero');
  const site = [...document.querySelectorAll('body > header, body > main, body > footer')];
  let exitTimer, focusTimer, entranceField;
  let entered = false;
  try { entered = sessionStorage.getItem('aiditi-entered') === '1'; } catch {}
  document.querySelector('#replay').hidden = reduced.matches;
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
        context.fillStyle = dark ? `rgba(205,193,255,${p.opacity + .3})` : `rgba(105,85,170,${p.opacity})`;
        context.beginPath(); context.arc(p.x, p.y, dark ? 1.5 : 1, 0, Math.PI * 2); context.fill();
        const next = positions[(i + 8) % positions.length];
        if (Math.hypot(p.x - next.x, p.y - next.y) < size * .4) {
          context.strokeStyle = dark ? 'rgba(195,184,245,.075)' : 'rgba(105,85,170,.07)';
          context.beginPath(); context.moveTo(p.x, p.y); context.lineTo(next.x, next.y); context.stroke();
        }
      });
      trail.forEach((p, i) => {
        p.life -= .035;
        if (!i) return;
        context.strokeStyle = dark ? `rgba(209,253,98,${Math.max(0,p.life) * .6})` : `rgba(105,85,170,${Math.max(0,p.life) * .4})`;
        context.lineWidth = dark ? 1.4 : 1;
        context.beginPath(); context.moveTo(trail[i - 1].x, trail[i - 1].y); context.lineTo(p.x, p.y); context.stroke();
      });
      trail = trail.filter(p => p.life > 0);
      if (pointer.active) {
        const gradient = context.createRadialGradient(mx, my, 0, mx, my, dark ? 150 : 110);
        gradient.addColorStop(0, dark ? 'rgba(195,184,245,.16)' : 'rgba(195,184,245,.18)'); gradient.addColorStop(1, 'rgba(195,184,245,0)');
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
    site.forEach(element => element.inert = false);
    document.body.classList.remove('intro-running');
    document.body.classList.add('arriving');
    entrance.classList.add('leaving');
    try { sessionStorage.setItem('aiditi-entered', '1'); } catch {}
    const userEntered = event?.type === 'click';
    setTimeout(() => {
      entrance.hidden = true; entranceField?.stop();
      if (userEntered || entrance.contains(document.activeElement)) document.querySelector('.brand').focus({ preventScroll: true });
    }, reduced.matches ? 0 : 1150);
    setTimeout(() => document.body.classList.remove('arriving'), 1900);
  }
  function startEntrance() {
    if (reduced.matches) { entrance.hidden = true; return; }
    window.scrollTo({ top: 0, behavior: 'instant' });
    entrance.hidden = false; entrance.classList.remove('leaving');
    entrance.style.removeProperty('--exit-x'); entrance.style.removeProperty('--exit-y');
    document.body.classList.remove('arriving'); document.body.classList.add('intro-running');
    site.forEach(element => element.inert = true);
    entranceField?.stop(); entranceField = lightField(document.querySelector('#entrance-field'), entrance, true);
    focusTimer = setTimeout(() => document.querySelector('#enter').focus({ preventScroll: true }), 100);
    exitTimer = setTimeout(finishEntrance, 5200);
  }
  document.querySelector('#enter').addEventListener('click', finishEntrance);
  document.querySelector('#skip-intro').addEventListener('click', finishEntrance);
  document.querySelector('#replay').addEventListener('click', startEntrance);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !entrance.hidden) finishEntrance(event); });
  reduced.addEventListener('change', () => {
    if (reduced.matches) { clearTimeout(exitTimer); entranceField?.stop(); heroField?.stop(); entrance.hidden = true; site.forEach(element => element.inert = false); document.body.classList.remove('intro-running','arriving'); }
  });
  if (!location.hash && !entered) startEntrance(); else entrance.hidden = true;
})();
