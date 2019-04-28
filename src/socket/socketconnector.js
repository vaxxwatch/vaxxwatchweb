class SocketConnector {
  socket = null;
  listeners = {};

  constructor(url) {
    this.url = url;
  }

  onMessage = (message) => {
    Object.values(this.listeners).forEach((listener) => {
      listener(message);
    });
  };

  addEventListener = (listener) => {
    if (Object.keys(this.listeners).length === 0) {
      // Open socket connection
      this.socket = new WebSocket(this.url);
      this.socket.onmessage = this.onMessage;
    }

    this.listeners[listener.id] = listener.callback;
  };

  removeEventListener = (listener) => {
    delete this.listeners[listener.id || listener];

    if (Object.keys(this.listeners).length === 0) {
      // Close socket connection
      this.socket.close();
      this.socket = null;
    }
  };
}

export default SocketConnector;
