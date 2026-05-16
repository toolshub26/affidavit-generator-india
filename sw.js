/* =========================================
   AGI ULTRA PRO v18 AI 🚀
   ENTERPRISE SERVICE WORKER
========================================= */

const CACHE_NAME =
"agi-ultra-v18-cache";

const STATIC_ASSETS = [

"/",

"index.html",
"premium.html",
"admin.html",
"dashboard.html",
"verify.html",

"style.css",
"script.js",
"manifest.json",

"icon-72.png",
"icon-96.png",
"icon-128.png",
"icon-144.png",
"icon-152.png",
"icon-192.png",
"icon-384.png",
"icon-512.png"

];

/* =========================================
INSTALL
========================================= */

self.addEventListener(
"install",
event=>{

console.log(
"SW Installed 🚀"
);

event.waitUntil(

caches.open(CACHE_NAME)
.then(cache=>{

return cache.addAll(
STATIC_ASSETS
);

})

);

self.skipWaiting();

}
);

/* =========================================
ACTIVATE
========================================= */

self.addEventListener(
"activate",
event=>{

console.log(
"SW Activated ✅"
);

event.waitUntil(

caches.keys()
.then(keys=>{

return Promise.all(

keys.map(key=>{

if(
key !== CACHE_NAME
){

console.log(
"Old Cache Deleted:",
key
);

return caches.delete(key);

}

})

);

})

);

self.clients.claim();

}
);

/* =========================================
FETCH
========================================= */

self.addEventListener(
"fetch",
event=>{

event.respondWith(

caches.match(
event.request
)
.then(response=>{

if(response){

return response;

}

return fetch(
event.request
)
.then(networkResponse=>{

return caches.open(
CACHE_NAME
)
.then(cache=>{

cache.put(
event.request,
networkResponse.clone()
);

return networkResponse;

});

})
.catch(()=>{

if(
event.request.destination === "document"
){

return caches.match(
"index.html"
);

}

});

})

);

}
);

/* =========================================
PUSH NOTIFICATION
========================================= */

self.addEventListener(
"push",
event=>{

let data = {

title:
"AGI ULTRA PRO 🚀",

body:
"New Legal Notification",

icon:
"icon-192.png"

};

if(event.data){

data =
event.data.json();

}

event.waitUntil(

self.registration.showNotification(

data.title,

{

body:data.body,

icon:data.icon,

badge:"icon-96.png",

vibrate:[
200,
100,
200
],

data:{
url:"index.html"
}

}

)

);

}
);

/* =========================================
NOTIFICATION CLICK
========================================= */

self.addEventListener(
"notificationclick",
event=>{

event.notification.close();

event.waitUntil(

clients.openWindow(
event.notification.data.url
)

);

}
);

/* =========================================
BACKGROUND SYNC
========================================= */

self.addEventListener(
"sync",
event=>{

if(
event.tag ===
"sync-affidavits"
){

event.waitUntil(

console.log(
"Background Sync Running 🔄"
)

);

}

}
);

/* =========================================
OFFLINE FALLBACK
========================================= */

self.addEventListener(
"fetch",
event=>{

if(
event.request.mode ===
"navigate"
){

event.respondWith(

fetch(event.request)
.catch(()=>{

return caches.match(
"index.html"
);

})

);

}

}
);

/* =========================================
MESSAGE LISTENER
========================================= */

self.addEventListener(
"message",
event=>{

if(
event.data &&
event.data.type ===
"SKIP_WAITING"
){

self.skipWaiting();

}

}
);

/* =========================================
PERIODIC CACHE CLEAN
========================================= */

async function clearOldCaches(){

const keys =
await caches.keys();

for(const key of keys){

if(
key !== CACHE_NAME
){

await caches.delete(key);

}

}

}

setInterval(()=>{

clearOldCaches();

},86400000);

/* =========================================
END
========================================= */

console.log(
"AGI ULTRA PRO v18 SW READY ✅"
);
