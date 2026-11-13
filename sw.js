const CACHE='zucker-tracker-v13';
const ASSETS=['./','./index.html','./styles.css?v=13','./app.js?v=13','./manifest.webmanifest?v=6','./icons/icon-192-v6.webp'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('zucker-tracker-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  const isAppCode=/\.(?:js|css)$/.test(url.pathname);
  if(request.mode==='navigate'||isAppCode){
    event.respondWith(fetch(request).then(response=>{
      if(response.ok){
        const copy=response.clone();
        event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));
      }
      return response;
    }).catch(async()=>{
      const cached=await caches.match(request);
      if(cached)return cached;
      if(request.mode==='navigate'){
        const fallback=await caches.match('./index.html');
        if(fallback)return fallback;
      }
      return Response.error();
    }));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
