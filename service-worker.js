const CACHE_NAME = 'info-dz-v3';
const PRECACHE = [
  'index.html',
  'admin.html',
  'manifest.json',
  'videos.json',
  'images/icon-192.svg',
  'images/icon-512.svg',
  'css/style.css',
  'js/script.js',
  'photo/Algerian_police_arresting_a_dangerous_202605281729.jpeg',
  'photo/Close-up_of_prisoner_hands_gripping_202605291251.jpeg',
  'photo/Dark_Algerian_prison_corridor,_realistic_202605291122.jpeg',
  'photo/Large_Algerian_courtroom_interior,_Arabic_202605291312.jpeg',
  'photo/Masked_criminal_attempting_car_theft_202605291359.jpeg',
  'photo/برومت_الخريطة_الجزائرية__Cinematic_realistic_202605291925.jpeg',
  'photo/برومت_الرقم_الأخضر_للدرك_الوطني__202605291656.jpeg'
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
