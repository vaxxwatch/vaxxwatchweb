import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet.heat';

import config from '../../config/default';
import SocketConnector from '../socket/socketconnector';
import './map.less';

const MOUSE_TIMEOUT = config.map.mouseMoveTimeout;

const STARTING_COORDINATES = [38, -95];
const ZOOM_LEVEL = 4;

const MAP_OPTIONS = {
  dragging: false,
  preferCanvas: true,
  zoomControl: false,
  attributionControl: false,
  minZoom: ZOOM_LEVEL,
  maxZoom: ZOOM_LEVEL,
};

const TILE_OPTIONS = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ['a', 'b', 'c'],
};

const MAP_STYLE = {
  height: '80vh',
  width: '90vw',
  border: '1px solid lightgray'
};

class Map extends React.PureComponent {
  componentDidMount() {
    const { listenerId } = this.state;

    const map = L
      .map(listenerId, MAP_OPTIONS)
      .setView(STARTING_COORDINATES, ZOOM_LEVEL);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', TILE_OPTIONS).addTo(map);

    this.setEventListener();
    this.setState(() => ({ map })); // eslint-disable-line react/no-unused-state
  }

  componentWillUnmount() {
    const { socket } = this.props;
    const { listenerId } = this.state;

    socket.removeEventListener(listenerId);
  }

  onMouseMove = (event) => {
    clearTimeout(this.mouseEventTimeout);

    this.mouseEventTimeout = setTimeout(this.handleMouseMove.bind(null, { ...event }), MOUSE_TIMEOUT);
  };

  handleMouseMove = (mouseEvent) => {
    const { map } = this.state;

    const mouseLatLng = map.mouseEventToLatLng(mouseEvent);

    console.log(mouseLatLng);
  };

  setEventListener = () => {
    const { socket } = this.props;
    const { listenerId } = this.state;

    socket.addEventListener({ callback: this.handleNewCoordinateMessage, id: listenerId });
  };

  handleNewCoordinateMessage = () => {
    throw new Error('Not Implemented');
  };

  render() {
    const { listenerId } = this.state;

    return (
      <div id={listenerId} style={MAP_STYLE} onClick={this.onMouseMove} />
    );
  }
}

Map.propTypes = {
  socket: PropTypes.instanceOf(SocketConnector).isRequired
};

export default Map;
