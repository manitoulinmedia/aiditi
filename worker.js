export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.hostname==='www.aiditi.art'||url.protocol==='http:'){
   if(url.hostname==='www.aiditi.art')url.hostname='aiditi.art';
   url.protocol='https:';
   return Response.redirect(url.href,301);
  }
  if(url.pathname==='/index.html'||url.pathname==='/labirinto'||url.pathname==='/labirinto.html'){
   url.pathname='/';return Response.redirect(url.href,301);
  }
  return env.ASSETS.fetch(request);
 }
};
