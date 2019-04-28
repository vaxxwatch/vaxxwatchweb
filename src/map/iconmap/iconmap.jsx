import L from 'leaflet';

import { tryParseJson } from '../../helpers/json';
import Map from '../map';

class HeatMap extends Map {
  state = {
    listenerId: 'iconMap',
  };

  handleNewCoordinateMessage = (message) => {
    const { map } = this.state;
    const { data } = message;

    const parsedData = tryParseJson(data);

    if (parsedData.length === 2) {
      L.marker(parsedData).addTo(map);
    }
  };
}

export default HeatMap;