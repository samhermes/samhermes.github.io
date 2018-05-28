var cacheName = '05282018';

// Cache the stylesheet as soon as the pwa is installed
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(
        [
          '/css/main.css',
          '/img/codepen.svg',
          '/img/github.svg',
        ]
      );
    })
  );
});

// Serve stylesheet from cache, then network if not available from cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});