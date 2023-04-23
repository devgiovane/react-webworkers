import userProto from '../proto/user.proto';

self.onmessage = function ({ data }) {
    const { User } = userProto;
    const message = User.decode(data);
    console.log(message);
    self.postMessage({ response: 'with values' });
}
