import L from 'leaflet';

import { isValidLatLng } from '../../helpers/latlng';
import { tryParseJson } from '../../helpers/json';
import Map from '../map';

class HeatMap extends Map {
  state = {
    listenerId: 'iconMap',
  };

  handleNewCoordinateMessage = (message) => {
    const { map } = this.state;
    const { data } = message;

    const parsedLatLng = tryParseJson(data);

    if (isValidLatLng(parsedLatLng)) {
      L.marker(parsedLatLng).addTo(map);
    }
  };
}

export default HeatMap;