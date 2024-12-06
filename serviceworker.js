const CACHE_NAME = 'mi-portafolio-cache-v1';
const urlsToCache = [
  '/',                     // Página principal
  '/index.html',           // HTML principal
  '/css/style.css',        // Estilos
  '/js/script.js',         // Script principal
  '/img/3m.png',           // Imágenes en la carpeta img
  '/img/acuaTech.png',
  '/img/canine.png',
  '/img/cinefox.jpg',
  '/img/dark.png',
  '/img/hackathon-agro.png',
  '/img/hackathon-hidrotechsen.png',
  '/img/icp-motoko.png',
  '/img/icpdeveloper.png',
  '/img/laducle.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos en caché:');
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Error al agregar archivos a la caché:', error);
      });
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminando caché antigua:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Devuelve desde la caché si está disponible
      return (
        response ||
        fetch(event.request).catch((error) => {
          console.error('Error al recuperar el archivo:', event.request.url, error);
          // Devuelve un archivo fallback si el fetch falla
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        })
      );
    })
  );
});
