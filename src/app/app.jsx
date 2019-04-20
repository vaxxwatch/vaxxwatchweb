import React from 'react';

import Map from '../map/map';
import {SocketConnector} from '../socket/socket';

const App = () => (
  <div>
    <Map socket={new SocketConnector()} strategy='heat' />
  </div>
);

export default App;
