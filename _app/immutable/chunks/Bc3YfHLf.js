import{_ as u}from"./C1FmrZbK.js";function _(c={}){const{immediate:o=!1,onNeedRefresh:p,onOfflineReady:a,onRegistered:r,onRegisteredSW:s,onRegisterError:t}=c;let i,n;const d=async(e=!0)=>{await n};async function l(){if("serviceWorker"in navigator){if(i=await u(async()=>{const{Workbox:e}=await import("./B9K5rw8f.js");return{Workbox:e}},[],import.meta.url).then(({Workbox:e})=>new e("./sw.js",{scope:"./",type:"classic"})).catch(e=>{t==null||t(e)}),!i)return;i.addEventListener("activated",e=>{(e.isUpdate||e.isExternal)&&window.location.reload()}),i.addEventListener("installed",e=>{e.isUpdate||a==null||a()}),i.register({immediate:o}).then(e=>{s?s("./sw.js",e):r==null||r(e)}).catch(e=>{t==null||t(e)})}}return n=l(),d}export{_ as registerSW};
