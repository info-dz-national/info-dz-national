const CACHE_NAME = 'info-dz-v2';
const PRECACHE = [
  'index.html',
  'admin.html',
  'manifest.json',
  'images/icon-192.svg',
  'images/icon-512.svg',
  'css/style.css',
  'js/script.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(PRECACHE.map((u) => cache.add(u).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.hostname !== self.location.hostname && url.hostname !== 'localhost') {
    if (url.href.includes('googleapis.com') || url.href.includes('gstatic.com') ||
        url.href.includes('cloudflare.com') || url.href.includes('fontawesome.com')) {
      event.respondWith(fetch(request).catch(() => caches.match(request)));
      return;
    }
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match('index.html');
        return new Response('', { status: 404 });
      });
    })
  );
});
