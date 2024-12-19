importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

// Check if Workbox is loaded
if (workbox) {
    console.log("Yay! Workbox is loaded!");

    // Precache and route assets
    workbox.precaching.precacheAndRoute([]);

    // Cache images in 'others' folder (change folder path as needed)
    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        new workbox.strategies.CacheFirst({
            cacheName: "images",
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                })
            ]
        })
    );

    // Cache JS and CSS files using StaleWhileRevalidate strategy
    workbox.routing.registerRoute(
        /.*\.(?:css|js|scss)/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: "assets",
        })
    );

    // Cache Google Fonts using CacheFirst strategy
    workbox.routing.registerRoute(
        new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
        new workbox.strategies.CacheFirst({
            cacheName: "google-fonts",
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
            ],
        })
    );

    // Initialize offline analytics
    workbox.googleAnalytics.initialize();

    // Force new service worker to take control of the page as soon as possible
    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

} else {
    console.log("Oops! Workbox didn't load.");
}