// Guarda la app en el celular para que abra rápido y también sin señal. Los datos del mar siempre se piden en vivo.
const VERSION = 'ola-mvjnupob';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== 'ola-fonts').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.hostname.endsWith('open-meteo.com')) return; // mar y viento: siempre en vivo
  if (u.hostname.includes('fonts.g')) { // tipografías: se guardan la primera vez
    e.respondWith(caches.open('ola-fonts').then(c => c.match(e.request).then(hit => hit || fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; }))));
    return;
  }
  if (u.origin === location.origin) { // la app: primero internet (para tener siempre la última versión), si no hay señal, la guardada
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request).then(h => h || caches.match('index.html'))));
  }
});
