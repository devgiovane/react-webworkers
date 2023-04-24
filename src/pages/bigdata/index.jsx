import { useEffect } from "react";

const CACHE_STORE = 'example';
const URL_SEED = '';
const URL_PROGRESSIVE = '';

const workerCache = new Worker(
    /* webpackChunkName: "protobuf-worker" */
    new URL('./workers/cache.js', import.meta.url), { type: 'module' }
);

const workerMain = new Worker(
    /* webpackChunkName: "protobuf-worker" */
    new URL('./workers/main.js', import.meta.url), { type: 'module' }
);

async function addCacheIfNotExists(store, key) {
    return new Promise(function (resolve, reject) {
       workerCache.onmessage = function ({ data }) {
           if (data === 'ok') return resolve();
       }
       workerCache.postMessage({ store, key });
    });
}

export function BigData() {

    async function setupSeed() {
        await addCacheIfNotExists(CACHE_STORE, URL_SEED);
    }

    async function addProgressiveProperty(propName) {
        await addCacheIfNotExists(CACHE_STORE, `${URL_PROGRESSIVE}/${propName}`);
    }

    useEffect(function () {
        workerMain.onmessage = function ({ data }) {
            if (data.method === 'update') {

            }
        }
        setupSeed()
            .catch(console.error);
    }, []);

    return(
        <section>
            <h1>BigData page</h1>
            <p>
                Render big data using WebWorkers.
            </p>
            <hr/>
            Not implemented.
        </section>
    )
}
