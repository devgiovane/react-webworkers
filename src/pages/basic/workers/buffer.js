self.onmessage = function ({ data }) {
    const decoder = new TextDecoder();
    const object = JSON.parse(decoder.decode(data));
    console.log(object);
    self.postMessage({ response: 'with values' });
}
