import SocketConnector from '../socket/socketconnector';
import TestSocket from '../socket/testsocket';

const Socket = process.env.NODE_ENV === 'production'
  ? SocketConnector
  : TestSocket;

export default Socket;