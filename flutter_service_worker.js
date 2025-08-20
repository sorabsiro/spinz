'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/asset/adv.jpg": "85a951334947d251c68113642f5840eb",
"assets/asset/fsts.jpg": "2b619642b651709ef67e576f934d89db",
"assets/asset/logof.png": "a6db8f6dc583cb0e0e7e6dac92c20a0e",
"assets/asset/snds.jpg": "4d9168bb6c7e7c49fed55f34d33bddfd",
"assets/asset/thrd.jpeg": "2c6e40e0f6d5a0ca8560a8471d522382",
"assets/AssetManifest.bin": "45a797080389b0b949d75570d77c1711",
"assets/AssetManifest.bin.json": "11ebaee16f1a7d440b0cd2cfca1e12f4",
"assets/AssetManifest.json": "d6d975a1f8bd7c466176146d879addc4",
"assets/assets/background.mp3": "cea9fbce5532fb0cfdf932c859c6bf12",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1a5e3680f43ee9eea6e1a42fbb54d694",
"assets/NOTICES": "370b67188959a7b6ba48ffab20f3a094",
"assets/packages/checkout_screen_ui/assets/images/apple-32.png": "9093edf287db8600bc186e9607916a04",
"assets/packages/checkout_screen_ui/assets/images/card_amex.png": "650359dc6d2af46ed20ccfcdac4719a6",
"assets/packages/checkout_screen_ui/assets/images/card_diners.png": "bfe3fd25d256a0601bd4017ffe9a6f84",
"assets/packages/checkout_screen_ui/assets/images/card_discover.png": "cc6e7458dcfe4f92b84610962c14f81d",
"assets/packages/checkout_screen_ui/assets/images/card_jcb.png": "87c7684e033657125bc99e305077c318",
"assets/packages/checkout_screen_ui/assets/images/card_mastercard.png": "b82d1e23200eb0108333da2d3667e4ef",
"assets/packages/checkout_screen_ui/assets/images/card_union_pay.png": "c986b0160e7b00a20e490a24c56f3ba0",
"assets/packages/checkout_screen_ui/assets/images/card_visa.png": "85d57bb0a82e92e6f4c17a1cd3a84d0a",
"assets/packages/checkout_screen_ui/assets/images/cvv_back.png": "474f6db18bbadfb28bfd98a4e79fc713",
"assets/packages/checkout_screen_ui/assets/images/cvv_front.png": "9169b9b152e3dae3e736f49e56746483",
"assets/packages/checkout_screen_ui/assets/images/google_pay_button.png": "0021c490ab2bed2313ff7da23dbdcacb",
"assets/packages/checkout_screen_ui/assets/images/G_mark_small.png": "3853bea160f56119432927417c4ed5b2",
"assets/packages/checkout_screen_ui/assets/images/pay_option_cash.png": "32d5c80cdfdd328d831cfad26942a9b6",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"favicon.png": "540c7c8d537c505e3d8cf2373d7d881a",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "174d4590c1f4e0400b97e98c17295585",
"icons/Icon-192.png": "690653fc15f070f2ea456ce8c4fd7622",
"icons/Icon-512.png": "690653fc15f070f2ea456ce8c4fd7622",
"icons/Icon-maskable-192.png": "690653fc15f070f2ea456ce8c4fd7622",
"icons/Icon-maskable-512.png": "690653fc15f070f2ea456ce8c4fd7622",
"index.html": "4c62474915a5f4313cc46b9f86d59fcb",
"/": "4c62474915a5f4313cc46b9f86d59fcb",
"main.dart.js": "7a5e52bed23d3d26fcbef2cd707e5275",
"manifest.json": "b1e748152f42d0139bf06d332b8c1cea",
"SpinnerMaster.apk": "cc306f1408e6698e8ac944f9b02fe75b",
"version.json": "2cb05704f47a2166f037d14ed901747f"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
