export default {
  service: {
    tcp: false,
    udp: false,
    unixds: true,
    host: '127.0.0.1',
    port: 7654,
    socket: '/tmp/bitconch-blockstream.sock',
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};
