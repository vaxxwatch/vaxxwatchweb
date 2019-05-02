import L from 'leaflet';
import 'leaflet.heat';

import { getLatLngListInRange, isValidLatLng } from '../../helpers/latlng';
import { tryParseJson } from '../../helpers/json';
import Map from '../map';

const COORDINATE_RANGE_METERS = 500000;

const HEAT_OPTIONS = {
  radius: 10,
};

const layerIsGraphics = (layer) => layer && ((layer._bounds && !layer._center) || layer._point );

class HeatMap extends Map {
  state = {
    listenerId: 'heatMap',
  };

  clearShapes = () => {
    const {map} = this.state;

    const layers = map._layers;

    if (!layers) {
      return;
    }

    const graphicLayers = Object.values(layers).filter(layerIsGraphics);

    graphicLayers.forEach((layer) => {
      map.removeLayer(layer);
    });
  };

  handleMouseMove = (moveEvent) => {
    const {heat, map} = this.state;    
    const mouseLatLng = map.mouseEventToLatLng(moveEvent);
    
    this.clearShapes();

    if (!heat || !heat._latlngs) {
      return;
    }

    const distanceCalculator = (a, b) => map.distance(a, b);
    const coordinatesInRange = getLatLngListInRange(mouseLatLng, heat._latlngs, distanceCalculator, COORDINATE_RANGE_METERS);

    if (coordinatesInRange < 1) {
      return;
    }

    L.circle(mouseLatLng, {radius: 20000, color: 'red', opacity: 0.27}).addTo(map);

    coordinatesInRange.forEach((latLng) => {
      L.circle(latLng, {radius: 50000, color: 'blue', opacity: 0.27}).addTo(map);
      L.polyline([latLng, mouseLatLng], {color: 'red', opacity: 0.81}).addTo(map);
    });
  };

  handleNewCoordinateMessage = (message) => {
    let { heat } = this.state;

    if (!heat) {
      heat = this.setupHeatLayer();
    }

    const { data } = message;
    const parsedLatLng = tryParseJson(data);

    if (isValidLatLng(parsedLatLng)) {
      heat.addLatLng(parsedLatLng);
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