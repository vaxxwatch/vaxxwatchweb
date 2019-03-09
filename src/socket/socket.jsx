import React from 'react';

const url = 'ws://localhost:5000/echo';

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
    socket.close(1000);
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
