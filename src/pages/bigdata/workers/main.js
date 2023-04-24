const CACHE_STORE = 'example';
const URL_SEED = '/seed';
const URL_PROGRESSIVE = '/progressive';

let seedData = [];
const arrays = [];

async function build() {
    const properties = Object.keys(arrays);
    const features = seedData.map((item, index) => {
        return item;
    });
    const collection = {
        type: 'collection',
        features
    }
    const blob = new Blob([JSON.stringify(collection)], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);
    self.postMessage({ method: 'update', blobUrl });
}

async function seed() {
    const cache = await caches.open(CACHE_STORE);
    seedData = await caches.match(URL_SEED).then(r => r.json());
    await build();
}

async function add(propName) {
    const cache = await caches.open(CACHE_STORE);
    arrays[propName] = await caches.match(`${URL_PROGRESSIVE}/${propName}`).then(r => r.json());
    await build();
}

self.onmessage = async function ({ data }) {
    switch (data.method) {
        case 'seed':
            await seed();
            break;
        case 'add':
            await add(data.propName);
            break;
    }
}
