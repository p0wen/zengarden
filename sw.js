/** how to make a progressive web app  - https://medium.com/james-johnson/a-simple-progressive-web-app-tutorial-f9708e5f2605
* "Once the cache is created it adds all of the files listed in the filesToCache array. 
* (Please note that while this code works for demonstration purposes it is not intended for production as it will stop if it fails to load even one of the files.)" https://medium.com/james-johnson/a-simple-progressive-web-app-tutorial-f9708e5f2605  
*/ 

let appName = "zengarden";
let cacheVersion = "version_1";
let cacheName = appName + cacheVersion;
let filesToCache = [
  "/zengarden/",
  "/zengarden/index.html",
  "/zengarden/assets/media/img/afternoon.jpg",
  "/zengarden/assets/media/img/sunrise.jpg",
  "/zengarden/assets/media/img/pause.svg",
  "/zengarden/assets/media/img/play.svg",
  "/zengarden/assets/media/sounds/ambientsound.mp3",
  "/zengarden/assets/media/sounds/ambientsound.webm",
  "/zengarden/assets/media/sounds/endbell.mp3",
  "/zengarden/assets/media/sounds/endbell.webm",
  "/zengarden/assets/media/sounds/startbell.mp3",
  "/zengarden/assets/media/sounds/startbell.webm",
  "/zengarden/assets/js/scripts/app.js",
  "/zengarden/assets/css/style.css",
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
