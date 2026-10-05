(() => {
 const sections=[...document.querySelectorAll('main>section:not(.hero)')];
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('in-view',isIntersecting)),{rootMargin:'0px 0px -4% 0px',threshold:0});
 // Only enhance after observer setup; without JS every section remains readable.
 sections.forEach(section=>{section.classList.add('view-motion');observer.observe(section);});
 const button=document.querySelector('#share-site'),status=document.querySelector('#share-status'),dialog=document.querySelector('#share-link-dialog');
 const words={en:['Share','Link copied','Copy this link','Opening share options…','Copying link…'],it:['Condividi','Link copiato','Copia questo link','Apertura opzioni di condivisione…','Copia del link…'],fr:['Partager','Lien copié','Copiez ce lien','Ouverture du partage…','Copie du lien…']};
 const labels=()=>words[document.documentElement.lang]||words.en;
 const url=()=>{const u=new URL('https://aiditi.art/');u.searchParams.set('lang',document.documentElement.lang);return u.href;};
 function language(){button.querySelector('.share-label').textContent=labels()[0];dialog.querySelector('button').setAttribute('aria-label',({en:'Close share link',it:'Chiudi link di condivisione',fr:'Fermer le lien de partage'}[document.documentElement.lang]||'Close share link'));status.textContent='';}
 document.addEventListener('languagechange',language);language();
 button.addEventListener('click',async()=>{
  const data={title:document.title,url:url()};
  try{if(navigator.share&&(!navigator.canShare||navigator.canShare(data))){status.textContent=labels()[3];await navigator.share(data);status.textContent='';return;}}
  catch(error){if(error.name==='AbortError'){status.textContent='';return;}}
  try{status.textContent=labels()[4];await Promise.race([navigator.clipboard.writeText(data.url),new Promise((_,reject)=>setTimeout(()=>reject(Error('Clipboard unavailable')),1800))]);status.textContent=labels()[1];}
  catch{status.textContent='';dialog.querySelector('label').firstChild.textContent=labels()[2];const input=dialog.querySelector('input');input.value=data.url;dialog.showModal();input.focus();input.select();}
 });
 dialog.querySelector('button').onclick=()=>dialog.close();
})();
