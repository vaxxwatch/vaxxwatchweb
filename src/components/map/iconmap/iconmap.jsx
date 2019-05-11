import L from 'leaflet';

import { isValidLatLng } from '../../../helpers/latlngHelper';
import { tryParseJson } from '../../../helpers/jsonHelper';
import Map from '../map';

class IconMap extends Map {
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

export default IconMap;