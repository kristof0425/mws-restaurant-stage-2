importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js"
);

if (workbox) {
  workbox.precaching.precacheAndRoute(["index.html", "restaurant.html"]);

  workbox.routing.registerRoute(
    new RegExp(".*.js"),
    workbox.strategies.networkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp("restaurant.html(.*)"),
    workbox.strategies.networkFirst({
      cacheName: "restaurant-pages"
    })
  );

  workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "css-cache"
    })
  );

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // Cache for a maximum of a week
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  );
} else {
  console.log("Workbox not available. 💩");
}
