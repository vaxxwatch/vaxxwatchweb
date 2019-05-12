export default {
  socket: {
    url: process.env.VAXX_SOCKET_URL || "wss://vaxxwatch.herokuapp.com/coordinate_socket"
  },
  map: {
    mouseMoveTimeout: 20
  },
  sentryDsn: process.env.SENTRY_DSN
};