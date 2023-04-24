async function addCacheIfNotExists(store, key) {
    const cache = await caches.open(store);
    const keys = await caches.keys();
    if (!keys.includes(key)) {
        await cache.add(key);
    }
}

self.onmessage = async function ({ data }) {
    const { store, key } = data;
    await addCacheIfNotExists(store, key);
    self.postMessage('ok');
}
