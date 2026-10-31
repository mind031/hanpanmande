// 홈 화면 앱용: 그림은 저장해 두고, 화면 파일은 늘 새로 받아요
const V='hanpan-v4';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  if(u.pathname.includes('/img/')||u.pathname.endsWith('.png')){
    e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{ if(res.ok) c.put(e.request,res.clone()); return res; }))));
  } else {
    e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
  }
});
