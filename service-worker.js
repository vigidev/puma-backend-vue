"use strict";var precacheConfig=[["index.html","6f773600a03f8412fdc924d429c03b2e"],["service-worker.js","ce840213893ebad953e351ad47475975"],["static/css/app.4e465b58ada50a7244b45998069ced94.css","27e2a9351d49d9e67fc19482ace6500a"],["static/js/app.51dfabe68110fc7f3e90.js","1c5a5a35c276ff9ad4489584bfea2d3e"],["static/js/manifest.2ae2e69a05c33dfc65f8.js","2f4fd3b092ed7f7e76dbb3976729742e"],["static/js/misc.js","53d4fabf6a66dfa5522383b658293057"],["static/js/off-canvas.js","e500d049c8e7cf705e91f4f3faf721ee"],["static/js/vendor.8c8da4a399d731b526cb.js","7ccfa72652ff1f8392f5d1fa778c0bea"],["static/vendors/css/vendor.bundle.base.css","97f366882446bd2e85a0d44ea7378bea"],["static/vendors/iconfonts/mdi/css/materialdesignicons.css","21116335028b9601e31a57fea708ae13"],["static/vendors/iconfonts/mdi/css/materialdesignicons.min.css","6edcf2a5e7862ef959f6e403f087ca4b"],["static/vendors/iconfonts/mdi/preview.html","b36dbac38c96f12db989f53d21dcc6a3"],["static/vendors/js/vendor.bundle.addons.js","d337acc861f441121f2661f98d586300"],["static/vendors/js/vendor.bundle.base.js","58421ad5bd476ce686db172ccd517a9e"]],cacheName="sw-precache-v3-oasys-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,!1);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));0,t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});