if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let b={};const d=e=>s(e,r),n={module:{uri:r},exports:b,require:d};a[r]=Promise.all(i.map((e=>n[e]||d(e)))).then((e=>(c(...e),b)))}}define(["./workbox-3e8df8c8"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"app/immutable/assets/_layout.D2qOpxN3.css",revision:"6480b826c8059c110657fc80cf6ad8bf"},{url:"app/immutable/assets/_page.D7-sWtZV.css",revision:"676ff9cad63205739db0025c4dfb8b44"},{url:"app/immutable/assets/0.PQkE5Cob.css",revision:"22578a51712ba651d8979931ec496304"},{url:"app/immutable/assets/2.DdWHEj6G.css",revision:"f645f55d34e153d5d19ebbb9dd6ecac7"},{url:"app/immutable/chunks/B9K5rw8f.js",revision:"d60138448ddfe6b549524d11f192875e"},{url:"app/immutable/chunks/Bc3YfHLf.js",revision:"acfad87cdc66156a4f2a7e3ca479ebd0"},{url:"app/immutable/chunks/BOrW0xBd.js",revision:"45c01dbb6e2eb841ef455ba4ff384066"},{url:"app/immutable/chunks/ByIlZBc-.js",revision:"41140b73066cc1319b72164161650541"},{url:"app/immutable/chunks/C1FmrZbK.js",revision:"17d364f6a55a02cc2a058c5c8a5e8d68"},{url:"app/immutable/chunks/CUmUhS6h.js",revision:"8f414abe82bb1eb7b76866741f8155e7"},{url:"app/immutable/chunks/dFgpR01i.js",revision:"cc1fcbf89eeb18383cb0ede2da994c22"},{url:"app/immutable/chunks/DmNVKrxJ.js",revision:"d9ca1dc64d76700d4222c27580c954f7"},{url:"app/immutable/chunks/dtw5b0Qf.js",revision:"467e09ef40d74a65397f6a220a9104d7"},{url:"app/immutable/chunks/DVk7LiYK.js",revision:"3dbfb4d5b16900bcc76364122bb35e67"},{url:"app/immutable/entry/app.DmAvzGd8.js",revision:"8e4c1ca01a13f315a545d20cb23fc9f8"},{url:"app/immutable/entry/start.BB2iK9PS.js",revision:"4b502988e927efb28d134afa1ea6d453"},{url:"app/immutable/nodes/0.B5_hRNSb.js",revision:"2422f688b9cdd4ad8dcb9ce7d34895e4"},{url:"app/immutable/nodes/1.B-7ERXMs.js",revision:"eb841139a5db19ffb6b360adfafc8b1a"},{url:"app/immutable/nodes/2.DUHLYCN6.js",revision:"f1d64688966c2f98e7776ee439d471b2"},{url:"favicon.png",revision:"a3bdbe5a971023fb8d158623892f9699"},{url:"icon-192.png",revision:"c76b120801dd953cfd95e8bf9103a9e4"},{url:"icon-512.png",revision:"44c18025c3d47d442e66b907b39ef618"},{url:"mask-icon.svg",revision:"9abdd145018cbe2363ffc7c2492a20ee"},{url:"/ev_range_calculator/",revision:"38eaa1fbea0ae143961c679eecb5af1d"},{url:"manifest.webmanifest",revision:"7bf022820be433105da88fd2de19ae8f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/ev_range_calculator/")))}));
