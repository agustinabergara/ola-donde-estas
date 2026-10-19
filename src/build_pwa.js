const fs = require('fs');
const path = require('path');
require('child_process').execSync('node build.js', { stdio: 'inherit' });
let body = fs.readFileSync('index.html', 'utf8');
const head = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#6FB8D0">
<meta name="description" content="Te dice si hay ola hoy y mañana, y qué tipo de ola, de Punta del Este a Rocha.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Ola">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<style>html,body{margin:0}body{background:#CFEAEE}</style>
</head>
<body>
`;
const tail = `
<script>
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {})); }
</script>
</body>
</html>
`;
fs.mkdirSync('pwa', { recursive: true });
fs.writeFileSync('pwa/index.html', head + body + tail);
fs.writeFileSync('pwa/manifest.webmanifest', JSON.stringify({
  name: 'Ola, dónde estás?', short_name: 'Ola', description: 'Te dice si hay ola hoy y mañana, de Punta del Este a Rocha.',
  lang: 'es', start_url: './', scope: './', display: 'standalone', orientation: 'portrait',
  background_color: '#CFEAEE', theme_color: '#6FB8D0',
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ] }, null, 2));
const v = Date.now().toString(36);
fs.writeFileSync('pwa/sw.js', `// Guarda la app en el celular para que abra rápido y también sin señal. Los datos del mar siempre se piden en vivo.
const VERSION = 'ola-${v}';
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
`);
console.log('pwa listo');
