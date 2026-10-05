(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const sections=[...document.querySelectorAll('main>section:not(.hero)')];
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('in-view',isIntersecting)),{rootMargin:'0px 0px -4% 0px',threshold:0});
 // Only enhance after observer setup; without JS every section remains readable.
 sections.forEach(section=>{section.classList.add('view-motion');observer.observe(section);});
 const button=document.querySelector('#share-site'),status=document.querySelector('#share-status'),dialog=document.querySelector('#share-link-dialog');
 const words={en:['Share','Link copied','Copy this link'],it:['Condividi','Link copiato','Copia questo link'],fr:['Partager','Lien copié','Copiez ce lien']};
 const labels=()=>words[document.documentElement.lang]||words.en;
 const url=()=>{const u=new URL('https://aiditi.art/');u.searchParams.set('lang',document.documentElement.lang);return u.href;};
 function language(){button.querySelector('.share-label').textContent=labels()[0];status.textContent='';}
 document.addEventListener('languagechange',language);language();
 button.addEventListener('click',async()=>{
  const data={title:document.title,url:url()};
  try{if(navigator.share&&navigator.canShare?.(data)){await navigator.share(data);return;}}
  catch(error){if(error.name==='AbortError')return;}
  try{await navigator.clipboard.writeText(data.url);status.textContent=labels()[1];}
  catch{dialog.querySelector('label').firstChild.textContent=labels()[2];const input=dialog.querySelector('input');input.value=data.url;dialog.showModal();input.focus();input.select();}
 });
 dialog.querySelector('button').onclick=()=>dialog.close();
})();
