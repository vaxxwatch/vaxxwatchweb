import L from 'leaflet';
import 'leaflet.heat';

import { tryParseJson } from '../../helpers/json';
import Map from '../map';

const HEAT_OPTIONS = {
  radius: 10,
};

class HeatMap extends Map {
  state = {
    listenerId: 'heatMap',
  };

  handleMouseMove = (moveEvent) => {
    const {heat, map} = this.state;    
    const mouseLatLng = map.mouseEventToLatLng(moveEvent);
    
    if (!heat || ! heat._latlngs) {
      return;
    }

    heat._latlngs.forEach((latlng, index) => {
      const distanceInMeters = map.distance(latlng, mouseLatLng);

      const distanceInKilometers = distanceInMeters / 1000;

      if (distanceInKilometers < 250) {
        console.log(index, `${distanceInKilometers.toFixed(0)}km`);
      }
    });
  };

  handleNewCoordinateMessage = (message) => {
    let { heat } = this.state;

    if (!heat) {
      heat = this.setupHeatLayer();
    }

    const { data } = message;
    const parsedData = tryParseJson(data);

    if (parsedData.length === 2) {
      heat.addLatLng(parsedData);
    }
  };

  setupHeatLayer = () => {
    const { map } = this.state;

    const heat = L.heatLayer([], HEAT_OPTIONS).addTo(map);

    this.setState(() => ({ heat }));

    return heat;
  };
}

export default HeatMap;