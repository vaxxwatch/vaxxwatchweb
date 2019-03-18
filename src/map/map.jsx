import React from 'react';
import L from 'leaflet';

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

const COORDINATE_TIMER_INTERVAL = 5000;

const MAP_ID = 'map';

const MAP_STYLE = {
  height: '80vh',
  width: '90vw',
  border: '1px solid lightgray'
};

class Map extends React.PureComponent {
  state = {
    map: null
  };

  componentDidMount() {
    const map = L
      .map(MAP_ID, MAP_OPTIONS)
      .setView(STARTING_COORDINATES, ZOOM_LEVEL);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', TILE_OPTIONS).addTo(map);

    map.on('click', function(event) {
      L.marker([event.latlng.lat, event.latlng.lng]).addTo(map);
    });

    //this.startCoordinateTimer();
    this.setState(() => ({
      map
    }));
  }

  componentWillUnmount() {
    const {mapUpdateInterval} = this.state;

    clearInterval(mapUpdateInterval);
  }

  startCoordinateTimer = () => {    
    const mapUpdateInterval = setInterval(() => {
      const {map} = this.state;

      const newLonCoordinate = (Math.random() * (49.3 - 25.3) + 25.3);
      const newLatCoordinate = (Math.random() * (124.5 - 66.3) + 66.3) * -1;

      L.marker([newLonCoordinate, newLatCoordinate]).addTo(map);
    }, COORDINATE_TIMER_INTERVAL);

    this.setState(() => ({
      mapUpdateInterval
    }));
  };

  render() {
    return (
      <div id={MAP_ID} style={MAP_STYLE} />
    );
  }
}

export default Map;
