import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet.heat';

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

const HEAT_OPTIONS = {
  radius: 10,
};

class Map extends React.PureComponent {
  state = {
    listenerId: 'map',
  };

  componentDidMount() {
    const map = L
      .map(MAP_ID, MAP_OPTIONS)
      .setView(STARTING_COORDINATES, ZOOM_LEVEL);
    
    const heat = L.heatLayer([], HEAT_OPTIONS).addTo(map);
      
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', TILE_OPTIONS).addTo(map);

    this.setEventListener();
    this.setState(() => ({
      map,
      heat
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

  tryParseJson = (json) => {
    try {
      json = JSON.parse(json);
    } catch (error) {
      // ignore 
    }

    return json;
  };

  handleNewCoordinateMessage = (message) => {
    const {map, heat} = this.state;
    const {data} = message;

    const parsedData = this.tryParseJson(data);

    if (parsedData.length === 2) {
      //L.marker(parsedData).addTo(map);
      heat.addLatLng(parsedData);
    } else {
      this.setState(() => ({
        socketMessage: parsedData
      }));
    }
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
