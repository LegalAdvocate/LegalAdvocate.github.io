self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('static-v1').then(function (cache) {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/favicon.ico'
        // Add more static files if needed
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
