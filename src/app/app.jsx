import React from 'react';

import config from '../../config/default';

import HeatMap from '../map/heatmap/heatmap';
import IconMap from '../map/iconmap/iconmap';

import SocketConnector from '../socket/socketconnector';
import TestSocket from '../socket/testsocket';

const { socket: { url } } = config;

const vaxxWatchConnection = new TestSocket(url);

const App = () => (
  <div>
    <HeatMap socket={vaxxWatchConnection} />
    {/* <br />
    <IconMap socket={vaxxWatchConnection} /> */}
  </div>
);

export default App;
