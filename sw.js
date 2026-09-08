// ⚠️ cache 名稱一定要跟 english-hub（家庭 hub）不同。
//    Cache Storage 跟 localStorage 一樣是綁 origin 不綁路徑 —— 兩個 hub 都在
//    fullmodel-star.github.io 底下，同名就會共用同一個桶、互相餵對方的 index.html：
//    小朋友開家庭 hub 卻看到公開版（少 5 支），或作品集訪客撞到密碼牆。
const C = "922_english-public-icons-8cbcd0487a";
const A = ["./index.html", "./manifest.json", "./ridgeline-ui.css", "./favicon.svg", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./icon.svg", "./", "./apple-touch-icon.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
self.addEventListener('message',e=>{if(e.data==='SKIP_WAITING'||e.data==='skipWaiting'||(e.data&&e.data.type==='SKIP_WAITING'))self.skipWaiting()});
