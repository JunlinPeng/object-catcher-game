/* ═══════════════════════════════════════════════════════════
   Service Worker — caches CDN libs & AI model for fast loads
   After first visit, the game loads near-instantly.
   ═══════════════════════════════════════════════════════════ */

const CACHE_NAME = 'object-catcher-v2';

// Resources to pre-cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.min.js',
  'https://unpkg.com/ml5@1/dist/ml5.min.js',
];

self.addEventListener('install', (event) => {
  console.log('[SW] Installing — pre-caching core assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] Some precache URLs failed (may be offline):', err.message);
      });
    })
  );
  // Activate immediately — don't wait for old SW to die
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Activated — cleaning old caches.');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Cache-First strategy: serve from cache, fall back to network
// All ml5.js model files (from tfhub.dev, googleapis.com, jsdelivr.net)
// will be auto-cached as they're fetched.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests and chrome-extension URLs
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Return from cache, but also refresh cache in background
        const fetchPromise = fetch(event.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        }).catch(() => {});
        return cached;
      }
      // Not in cache — fetch from network and cache it
      return fetch(event.request).then((response) => {
        if (!response.ok) return response;
        // Only cache same-origin or CDN requests
        const isCachable =
          url.origin === location.origin ||
          url.hostname.includes('cdnjs.cloudflare.com') ||
          url.hostname.includes('unpkg.com') ||
          url.hostname.includes('jsdelivr.net') ||
          url.hostname.includes('tfhub.dev') ||
          url.hostname.includes('googleapis.com') ||
          url.hostname.includes('storage.googleapis.com') ||
          url.hostname.includes('www.gstatic.com');
        if (isCachable) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch(() => {
        // Offline & not cached — just fail gracefully
        return new Response('Offline — resource not cached yet.', { status: 503 });
      });
    })
  );
});
