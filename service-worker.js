const CACHE = 'rich-cmd-cache-v765';
const APP_VERSION = 'v7.6.5';
const CORE_ASSETS = [
  './',
  './index.html',
  './index.html?v=765',
  './styles.css?v=765',
  './vro-data.js?v=765',
  './app.js?v=765',
  './manifest.json?v=765',
  './version.json',
  './agf-groenten-schaplijst-v763.csv',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key !== CACHE && key.includes('rich-cmd-cache'))
        .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  const type = event.data && event.data.type;
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (type === 'CACHE_CORE') {
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE_ASSETS)));
    return;
  }
  if (type === 'GET_VERSION') {
    event.source && event.source.postMessage({type:'VERSION_STATUS', version: APP_VERSION, cache: CACHE});
  }
});

function cacheResponse(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') return response;
  const copy = response.clone();
  caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {});
  return response;
}

function cachedAppShell() {
  return caches.match('./index.html?v=765')
    .then(match => match || caches.match('./index.html') || caches.match('./'));
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const request = event.request;
  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => cacheResponse(request, response))
        .catch(() => caches.match(request).then(match => match || cachedAppShell()))
    );
    return;
  }

  if (sameOrigin && /\/(service-worker\.js|version\.json)$/.test(url.pathname)) {
    event.respondWith(fetch(request, {cache:'no-store'}).catch(() => caches.match(request)));
    return;
  }

  if (sameOrigin && /\/(app\.js|vro-data\.js|styles\.css|manifest\.json|icon-192\.png|icon-512\.png)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(match => match || fetch(request).then(response => cacheResponse(request, response)))
        .catch(() => caches.match(url.pathname.split('/').pop()))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => cacheResponse(request, response))
      .catch(() => caches.match(request))
  );
});
