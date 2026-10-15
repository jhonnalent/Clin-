const C='clin-v2',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
const keep=(r,n)=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp));return n};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
if(new URL(r.url).origin===location.origin){e.respondWith(fetch(r,{cache:'no-cache'}).then(n=>keep(r,n)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))}
else{e.respondWith(caches.match(r).then(m=>m||fetch(r).then(n=>keep(r,n))))}});
