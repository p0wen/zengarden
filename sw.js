/** how to make a progressive web app  - https://medium.com/james-johnson/a-simple-progressive-web-app-tutorial-f9708e5f2605*/


/* "Once the cache is created it adds all of the files listed in the filesToCache array. (Please note that while this code works for demonstration purposes it is not intended for production as it will stop if it fails to load even one of the files.)" https://medium.com/james-johnson/a-simple-progressive-web-app-tutorial-f9708e5f2605 */ 

var cacheName = "zengarden";
var filesToCache = [
  "/",
  "/index.html",
 /** 
  * "/assets/media/img/afternoon.jpg",
  "/assets/media/img/sunrise.jpg",
  "/assets/media/img/pause.svg",
  "/assets/media/img/play.svg",
  "/assets/media/sounds/ambientsound.mp3",
  "/assets/media/sounds/ambientsound.webm",
  "/assets/media/sounds/endbell.mp3",
  "/assets/media/sounds/endbell.webm",
  "/assets/media/sounds/startbell.mp3",
  "/assets/media/sounds/startbell.webm",
  */ 
  "/assets/js/scripts/app.js",
  "/assets/css/style.css",
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
