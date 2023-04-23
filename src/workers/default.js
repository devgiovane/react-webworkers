self.onmessage = function ({ data }) {
    console.log(data);
    self.postMessage({ response: 'with values' });
}
