import React from 'react';
import loadable from 'loadable-components';

import config from '../config/default';

import SocketConnector from '../helpers/socketHelper';

import ErrorBoundry from '../components/error/boundry';

const HeatMap = loadable(() => import('../components/map/heatmap/heatmap'));

//import IconMap from '../map/iconmap/iconmap';

const { socket: { url } } = config;

const vaxxWatchConnection = new SocketConnector(url);

const App = () => (
  <ErrorBoundry>
    <div>
      <HeatMap socket={vaxxWatchConnection} />
    </div>
  </ErrorBoundry>
);

export default App;
