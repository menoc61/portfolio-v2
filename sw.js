const staticCacheName = "site-v1",
  filesToCache = ["/offline/index.html"];
this.addEventListener("install", (e) => {
  this.skipWaiting(),
    e.waitUntil(caches.open("site-v1").then((e) => e.addAll(filesToCache)));
}),
  this.addEventListener("fetch", (e) => {
    e.respondWith(
      caches
        .match(e.request)
        .then((t) => t || fetch(e.request))
        .catch(() => caches.match("/offline/index.html"))
    );
  });
