import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';

import {SocketConnector} from '../socket/socket';

import './map.less';

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

const MAP_ID = 'map';

const MAP_STYLE = {
  height: '80vh',
  width: '90vw',
  border: '1px solid lightgray'
};

class Map extends React.PureComponent {
  state = {
    listenerId: 'map',
  };

  componentDidMount() {
    const map = L
      .map(MAP_ID, MAP_OPTIONS)
      .setView(STARTING_COORDINATES, ZOOM_LEVEL);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', TILE_OPTIONS).addTo(map);

    // map.on('click', function(event) {
    //   L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
    // });

    this.setEventListener();
    this.setState(() => ({
      map
    }));
  }

  componentWillUnmount() {
    const {socket} = this.props;
    const {listenerId} = this.state;

    socket.removeEventListener(listenerId);
  }

  setEventListener = () => {
    const {socket} = this.props;
    const {listenerId} = this.state;

    socket.addEventListener({callback: this.handleNewCoordinateMessage, id: listenerId});
  };

  handleNewCoordinateMessage = (message) => {
    const {map} = this.state;
    const {data} = message;

    if (data.length === 2) {
      L.marker(...data).addTo(map);
      return;
    }

    this.setState(() => ({
      socketMessage: data
    }));
  };

  render() {
    const {socketMessage} = this.state;

    return (
      <>
        <div id={MAP_ID} style={MAP_STYLE} />
        <p>{socketMessage}</p>
      </>
    );
  }
}

Map.propTypes = {
  socket: PropTypes.instanceOf(SocketConnector).isRequired
};

export default Map;
