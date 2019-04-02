import React from 'react';

const url = 'wss://vaxxwatch.herokuapp.com/coordinate_socket';

export class SocketConnector {
  socket = null;
  listeners = {};

  onMessage = (message) => {
    Object.values(this.listeners).forEach((listener) => {
      listener(message);
    });
  };

  addEventListener = (listener) => {
    if (Object.keys(this.listeners).length === 0) {
      this.socket = new WebSocket(url);
      this.socket.onmessage = this.onMessage;
    }

    this.listeners[listener.id] = listener.callback;
  };

  removeEventListener = (listener) => {
    delete this.listeners[listener.id || listener];

    if (Object.keys(this.listeners).length === 0) {
      this.socket.close();
      this.socket = null;
    }
  };
}

class Socket extends React.PureComponent {
  state = {
    socket: new WebSocket(url),
    count: 0,
  };

  componentDidMount() {
    const { socket } = this.state;
    socket.onmessage = this.onMessage;
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.close();
  }

  onMessage = (msg) => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      msg: msg.data,
    }));
  };

  render() {
    const { count, msg } = this.state;

    return (
      <div>
        <p>Socket says: <span><b>{msg}</b></span></p>
        <p>Message count is: {count}</p>
      </div>
    );
  }
}

export default Socket;
