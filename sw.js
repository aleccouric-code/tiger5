// Service worker: keeps the app usable on the course with weak signal.
// Bump VERSION whenever you change app files so phones pick up the update.
const VERSION = 'tiger5-v38';
const SHELL = [
  './', 'index.html', 'app.js', 'config.js', 'courses.js', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/favicon-32.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'
];

self.addEventListener('install', (e) => {
  // cache: 'reload' skips the browser's HTTP cache so a new version never
  // starts out with stale copies of the app files.
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never cache Supabase API traffic; the app handles offline itself.
  if (url.hostname.endsWith('supabase.co')) return;

  if (url.origin === location.origin) {
    // App files: network first so updates arrive, cache when offline.
    // 'no-cache' makes the browser check GitHub for a newer copy every time
    // instead of reusing one from its own cache for up to 10 minutes.
    e.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match('index.html')))
    );
  } else {
    // Fonts and the Supabase library: cache first (they're versioned).
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res;
      }))
    );
  }
});

// Push notifications, sent by the `push` edge function in Supabase.
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Sandie', {
    body: d.body || '',
    icon: 'icons/icon-192.png',
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || './' }
  }));
});

// Tapping one opens the app on the right screen (or switches the open app there).
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope);
  if (url.origin !== location.origin) return;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
    const win = list.find((w) => new URL(w.url).origin === location.origin);
    if (win) { win.postMessage({ open: url.href }); return win.focus(); }
    return self.clients.openWindow(url.href);
  }));
});
