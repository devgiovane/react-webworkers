import { useEffect } from "react";
import userProto from '../proto/user.proto';

const workerDefault = new Worker(
    /* webpackChunkName: "default-worker" */
    new URL('../workers/default.js', import.meta.url), { type: 'module' }
);

const workerBuffer = new Worker(
    /* webpackChunkName: "buffer-worker" */
    new URL('../workers/buffer.js', import.meta.url), { type: 'module' }
);

const workerProtobuf = new Worker(
    /* webpackChunkName: "protobuf-worker" */
    new URL('../workers/protobuf.js', import.meta.url), { type: 'module' }
);

export function Home() {
    function sendToWorkerDefault() {
        workerDefault.postMessage({ request: 'with values' });
    }

    function sendToWorkerBuffer() {
        const encoder = new TextEncoder();
        const array = encoder.encode(JSON.stringify({ request: 'with values' }))
        workerBuffer.postMessage(array, [ array.buffer ]);
    }

    function sendToWorkerProtobuf() {
        const { User } = userProto;
        const message = User.create({ name: 'Giovane Santos' });
        const array = User.encode(message).finish();
        workerProtobuf.postMessage(array, [ array.buffer ]);
    }

    useEffect(function () {
        workerDefault.onmessage = function ({ data }) {
            console.log(data);
        }
        workerBuffer.onmessage = function ({ data }) {
            console.log(data);
        }
    }, [ ]);

    return (
        <section>
            <h1>Home page</h1>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <hr/>
            <button onClick={sendToWorkerDefault} >
                Send to worker default
            </button>
            <button onClick={sendToWorkerBuffer} >
                Send to worker buffer
            </button>
            <button onClick={sendToWorkerProtobuf} >
                Send to worker protobuf
            </button>
        </section>
    )
}
