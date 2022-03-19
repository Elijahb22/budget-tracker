const APP_PREFIX = 'BudgetTracker-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

// which items are we going to cache?
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/js/idb.js",
    "/js/index.js",
    "/css/styles.css",
    "/icons/icon-512x512.png",
    "/icons/icon-384x384.png",
    "/icons/icon-192x192.png",
    "/icons/icon-152x152.png",
    "/icons/icon-144x144.png",
    "/icons/icon-128x128.png",
    "/icons/icon-96x96.png",
    "/icons/icon-72x72.png"
];

self.addEventListener('install', function (e) {
    e.waitUnntil(
      caches.open(CACHE_NAME).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        // add every file in the FILES_TO_CACHE array to the cache
        return cache.addAll(FILES_TO_CACHE)
      })
    )
})

self.addEventListener('activate', function (e) {
    e.waitUntil(
        // .keys() returns an array of all cache names, which we're calling keyList. keyList is a parameter that contains all cache names under <username>.github.io
      caches.keys().then(function (keyList) {
        let cacheKeeplist = keyList.filter(function (key) {
          return key.indexOf(APP_PREFIX);
        });

    cacheKeeplist.push(CACHE_NAME);

    //Remember that we set up CACHE_NAME as a global constant to help keep track of which cache to use. Finish the routine with the return statement shown in the following sample:

    return Promise.all(keyList.map(function (key, i) {
            if (cacheKeeplist.indexOf(key) === -1) {
                console.log('deleting cache : ' + keyList[i] );
                return caches.delete(keyList[i]);
            }
        })
    );
    })
   );
});

