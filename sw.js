/* Sam Huat Casino II - keeps the casino on this device (version 904ea80caf) */
const CACHE = 'shc-904ea80caf';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon180.png', './icon512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  const key = r.mode === 'navigate' ? './index.html' : r;
  e.respondWith(caches.open(CACHE).then(c => c.match(key, {ignoreSearch: true}).then(hit => hit || fetch(r).then(res => { if (res.ok) c.put(r, res.clone()); return res; }))));
});
