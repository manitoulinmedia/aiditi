window.createLabirintoField = (() => {
  let player, paused=false, ready=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function background(container) {
    if(player || !window.Vimeo)return;
    const films=[{id:75150022,start:22,length:173,title:'CONCERTO PER LABIRINTO',slot:'labirinto-player'}, {id:70500403,start:36,length:174,title:'REALITY — REM RIOT PRODUCTION',slot:'reality-player'}];
    let current=0,switching=false,enabled=true;
    const players=films.map(f=>new Vimeo.Player(f.slot,{id:f.id,background:true,autoplay:false,muted:true,loop:false,autopause:false,dnt:true,controls:false}));
    // Concerto clean visual excerpt 00:22–03:15; clean late footage verified at 03:12 and 03:22.
    // Source review: REALITY title at 00:06; animation verified at 00:36 and 03:35, credits at 03:50.
    // Out point 03:30 leaves a safety margin for the 2.6-second crossfade.
    const setCredit=i=>{const f=films[i];container.querySelector('.film-credit>span').textContent=f.title;container.querySelector('.film-credit a').href='https://vimeo.com/'+f.id;container.dataset.activeFilm=String(f.id);};
    async function transition(){
      if(switching||!enabled||paused||container.hidden||document.hidden)return;
      switching=true;const next=1-current,old=current;
      try{await players[old].pause();await players[next].setCurrentTime(films[next].start);await players[next].play();if(!enabled||paused||container.hidden){await players[next].pause();switching=false;return;}
        container.classList.toggle('reality-active',next===1);setCredit(next);current=next;
        setTimeout(()=>{players[old].pause().catch(()=>{});switching=false;},2600);
      }catch(error){container.dataset.transitionError=String(error?.message||error);switching=false;}
    }
    players.forEach((v,i)=>{
      v.on('playing',()=>{ready=true;container.dataset.videoState='playing';container.classList.add('film-ready');if(paused||!enabled||container.hidden||document.hidden||(i!==current&&!switching))v.pause().catch(()=>{});});
      v.on('timeupdate',e=>{if(i!==current)return;container.dataset.videoTime=e.seconds.toFixed(2);if(e.seconds>=films[i].start+films[i].length)transition();});
      v.on('error',()=>container.dataset.videoState='poster');
    });
    player={pause(){enabled=false;container.dataset.videoState='paused';return Promise.all(players.map(v=>v.pause().catch(()=>{})));},play(){enabled=true;return players[current].play();}};
    setCredit(0);
    Promise.all(players.map((v,i)=>v.ready().then(()=>v.setCurrentTime(films[i].start)).catch(()=>{}))).then(()=>{if(paused||container.hidden||document.hidden)return player.pause();return player.play();}).catch(()=>container.dataset.videoState='poster');
  }
  return function create(canvas,container) {
    const context=canvas.getContext('2d'),toggle=container.querySelector('#motion-toggle');
    let width=0,height=0,frame,running=true,lastFrame=0,points=[],sparks=[],pointer={x:0,y:0,active:false},previous=null,energy=0,targetEnergy=0;
    let logo={x:0,y:0,rx:0,ry:0},target={x:0,y:0,rx:0,ry:0};
    paused=reduced.matches;
    function label(){toggle.dataset.i18n=paused?'resumeMotion':'pauseMotion';toggle.textContent=window.AiDiTiI18n.t(toggle.dataset.i18n);toggle.setAttribute('aria-pressed',String(paused));container.classList.toggle('motion-paused',paused);}
    function resize(){width=container.clientWidth;height=container.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;context?.setTransform(dpr,0,0,dpr,0,0);points=[];sparks=[];previous=null;}
    const observer=new ResizeObserver(resize);observer.observe(container);resize();
    function move(e){
      if(paused||!context)return;
      const r=container.getBoundingClientRect(),now=performance.now(),x=e.clientX-r.left,y=e.clientY-r.top;
      pointer={x,y,active:true};
      const elapsed=previous?now-previous.time:0,dx=previous?x-previous.x:0,dy=previous?y-previous.y:0,distance=Math.hypot(dx,dy);
      const intensity=previous&&elapsed<160?Math.min(1,distance/Math.max(8,elapsed)*1000/1700):0;
      targetEnergy=Math.max(targetEnergy,intensity);
      if(previous&&elapsed<160){
        const steps=Math.min(32,Math.max(1,Math.ceil(distance/9)));
        for(let i=1;i<=steps;i++){
          const px=previous.x+dx*i/steps,py=previous.y+dy*i/steps;
          points.push({x:px,y:py,time:now,intensity});
          if(intensity>.15){sparks.push({x:px,y:py,vx:(Math.random()-.5)*(25+intensity*80),vy:(Math.random()-.5)*(25+intensity*80),time:now,life:500+intensity*900,intensity});}
        }
      }else points.push({x,y,time:now,intensity:0});
      if(points.length>260)points.splice(0,points.length-260);
      const cap=width<600?130:300;if(sparks.length>cap)sparks.splice(0,sparks.length-cap);
      previous={x,y,time:now};
      target={x:(x/width-.5)*36,y:(y/height-.5)*26,rx:-(y/height-.5)*7,ry:(x/width-.5)*9};
      container.dataset.lightSpeed=intensity.toFixed(3);
    }
    function leave(){pointer.active=false;previous=null;targetEnergy=0;target={x:0,y:0,rx:0,ry:0};}
    function draw(now){
      if(!running)return;frame=requestAnimationFrame(draw);
      if(paused||document.hidden||now-lastFrame<25)return;
      const dt=Math.min(.05,(now-lastFrame)/1000||.03);lastFrame=now;
      energy+=(targetEnergy-energy)*.12;targetEnergy*=.92;
      for(const k of Object.keys(logo))logo[k]+=(target[k]-logo[k])*.075;
      container.style.setProperty('--logo-x',logo.x+'px');container.style.setProperty('--logo-y',logo.y+'px');container.style.setProperty('--logo-rx',logo.rx+'deg');container.style.setProperty('--logo-ry',logo.ry+'deg');container.style.setProperty('--logo-glow',(10+energy*75)+'px');
      container.dataset.lightEnergy=energy.toFixed(3);
      if(!context)return;context.clearRect(0,0,width,height);context.globalCompositeOperation='lighter';
      points=points.filter(p=>now-p.time<900+p.intensity*1200);
      for(let i=1;i<points.length;i++){
        const p=points[i],prior=points[i-1],life=Math.max(0,1-(now-p.time)/(900+p.intensity*1200));if(p.time-prior.time>170)continue;
        const power=.18+p.intensity*.8;
        for(const layer of [{width:13+p.intensity*13,alpha:.08},{width:3+p.intensity*3,alpha:.45},{width:1.2,alpha:.95}]){
          context.lineWidth=layer.width;context.lineCap='round';context.strokeStyle=`rgba(${layer.width<2?'255,255,255':'225,225,225'},${life*power*layer.alpha})`;context.beginPath();context.moveTo(prior.x,prior.y);context.lineTo(p.x,p.y);context.stroke();
        }
      }
      sparks=sparks.filter(p=>now-p.time<p.life);
      sparks.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.98;p.vy*=.98;const fade=1-(now-p.time)/p.life;context.fillStyle=`rgba(240,240,240,${fade*p.intensity*.8})`;context.beginPath();context.arc(p.x,p.y,.8+p.intensity*1.5,0,Math.PI*2);context.fill();});
      if(pointer.active){const radius=35+energy*145,g=context.createRadialGradient(pointer.x,pointer.y,0,pointer.x,pointer.y,radius);g.addColorStop(0,`rgba(255,255,255,${.1+energy*.55})`);g.addColorStop(.18,`rgba(230,230,230,${.06+energy*.22})`);g.addColorStop(1,'rgba(230,230,230,0)');context.fillStyle=g;context.fillRect(pointer.x-radius,pointer.y-radius,radius*2,radius*2);}
      context.globalCompositeOperation='source-over';
    }
    function motion(){paused=!paused;label();if(paused){context?.clearRect(0,0,width,height);points=[];sparks=[];leave();container.style.setProperty('--logo-x','0px');container.style.setProperty('--logo-y','0px');container.style.setProperty('--logo-rx','0deg');container.style.setProperty('--logo-ry','0deg');container.style.setProperty('--logo-glow','10px');player?.pause().catch(()=>{});}else{background(container);player?.play().catch(()=>{});}}
    function visibility(){if(document.hidden)player?.pause().catch(()=>{});else if(!paused&&!container.hidden)player?.play().catch(()=>{});}
    function preference(){if(reduced.matches&&!paused)motion();}
    container.addEventListener('pointermove',move,{passive:true});container.addEventListener('pointerleave',leave);toggle.addEventListener('click',motion);document.addEventListener('visibilitychange',visibility);reduced.addEventListener('change',preference);document.addEventListener('languagechange',label);
    label();if(!paused){background(container);if(ready)player?.play().catch(()=>{});}if(context)frame=requestAnimationFrame(draw);
    return {stop(){running=false;cancelAnimationFrame(frame);observer.disconnect();container.removeEventListener('pointermove',move);container.removeEventListener('pointerleave',leave);toggle.removeEventListener('click',motion);document.removeEventListener('visibilitychange',visibility);document.removeEventListener('languagechange',label);reduced.removeEventListener('change',preference);context?.clearRect(0,0,width,height);player?.pause().catch(()=>{});}};
  };
})();

window.createNodeMarks = container => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),pointer={x:0,y:0};
  let frame,running=true,last=0;
  const canvases=[...container.querySelectorAll('.node-field')].map(canvas=>({canvas,context:canvas.getContext('2d')}));
  const shape=[[.15,.47],[.33,.14],[.67,.12],[.87,.4],[.72,.81],[.34,.86],[.48,.47],[.58,.66]];
  const edges=[[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,6],[1,6],[2,6],[3,6],[4,7],[5,7],[6,7],[2,7]];
  function paint(time=0){canvases.forEach(({canvas,context},index)=>{
    if(!context)return;const size=canvas.parentElement.clientWidth||80,dpr=Math.min(devicePixelRatio||1,2);
    if(canvas.width!==Math.round(size*dpr)){canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}context.setTransform(dpr,0,0,dpr,0,0);context.clearRect(0,0,size,size);
    const pts=shape.map(([x,y],i)=>({x:(x+pointer.x*.035+Math.sin(time*.0004+i+index)*.015)*size,y:(y+pointer.y*.035+Math.cos(time*.0005+i)*.015)*size}));
    context.strokeStyle='rgba(225,225,225,.45)';context.lineWidth=.75;edges.forEach(([a,b])=>{context.beginPath();context.moveTo(pts[a].x,pts[a].y);context.lineTo(pts[b].x,pts[b].y);context.stroke();});context.fillStyle='#e1e1e1';pts.forEach(p=>{context.beginPath();context.arc(p.x,p.y,2.1,0,Math.PI*2);context.fill();});
  });}
  function move(e){if(reduced.matches)return;const r=container.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5;}
  function leave(){pointer.x=0;pointer.y=0;}
  function draw(time){if(!running)return;frame=requestAnimationFrame(draw);if(document.hidden||reduced.matches||time-last<40)return;last=time;paint(time);}
  paint();frame=requestAnimationFrame(draw);container.addEventListener('pointermove',move,{passive:true});container.addEventListener('pointerleave',leave);
  return {stop(){running=false;cancelAnimationFrame(frame);container.removeEventListener('pointermove',move);container.removeEventListener('pointerleave',leave);}};
};
