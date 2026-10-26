(() => {
 const w=works.find(w=>w.slug===document.body.dataset.project),locale=window.AiDiTiI18n;
 if(!w)return;
 const asset=s=>/^https:\/\//.test(s)?s:'/'+s.replace(/^\//,'');
 const safe=s=>{try{const u=new URL(asset(s),location.origin);return ['https:','http:'].includes(u.protocol)?u.href:null}catch{return null}};
 const media=document.querySelector('#project-media');media.replaceChildren();
 const entries=[{src:w.image,alt:w.title},...(Array.isArray(w.media)?w.media:[])];const seen=new Set();
 for(const entry of entries){const m=typeof entry==='string'?{src:entry}:entry;if(!m?.src)continue;const src=safe(m.src);if(!src||seen.has(src))continue;seen.add(src);const f=document.createElement('figure'),el=document.createElement(m.type==='video'?'video':'img');el.src=src;if(el.tagName==='VIDEO'){el.controls=true;el.preload='metadata'}else{el.alt=m.alt||w.title;el.loading=seen.size===1?'eager':'lazy'}f.append(el);if(m.caption){const c=document.createElement('figcaption');c.textContent=m.caption;f.append(c)}media.append(f)}
 const film=document.querySelector('#project-film');
 if(w.video){const url=new URL(w.video);if(['www.youtube.com','www.youtube-nocookie.com','player.vimeo.com'].includes(url.hostname)){const b=document.createElement('button');b.className='pill';b.dataset.i18n='play';b.innerHTML=locale.t('play');film.append(b);b.addEventListener('click',()=>{const frame=document.createElement('iframe');frame.src=url.href;frame.title=locale.t('artworkVideo');frame.className='project-film-frame';frame.allow='fullscreen; picture-in-picture';frame.allowFullscreen=true;film.replaceChildren(frame)})}}
 function translate(){document.title=w.title+' — AiDiTi';document.querySelector('#project-category').textContent=locale.category(w.category);document.querySelector('#project-description').textContent=locale.description(w);document.querySelector('#project-dimensions').textContent=w.category==='Drawing'?locale.t('drawingDimensions'):'';document.querySelector('#project-inquiry').href='mailto:contact@aiditi.art?subject='+encodeURIComponent(locale.t('inquirySubject')+' '+w.title);document.querySelectorAll('.project-back').forEach(a=>a.href='/?lang='+locale.language+'#work');const print=document.querySelector('#project-print');print.hidden=w.category!=='Drawing';print.href='mailto:contact@aiditi.art?subject='+encodeURIComponent(locale.t('printSubject')+' '+w.title);document.querySelector('meta[name="description"]').content=locale.description(w);}
 document.addEventListener('languagechange',translate);translate();
})();
