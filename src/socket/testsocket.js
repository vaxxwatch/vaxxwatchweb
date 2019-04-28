import SocketConnector from "./socketconnector";

const GENERATOR_TIMING = 1000;

const NORTH_BOUND = 49.3457868;
const SOUTH_BOUND = 24.7433195;
const WEST_BOUND = -124.7844079;
const EAST_BOUND = -66.9513812;

class TestSocketConnector extends SocketConnector {
  latLngGenerator = null;
  listeners = {};

  onMessage = (message) => {
    Object.values(this.listeners).forEach((listener) => {
      listener(message);
    });
  };

  addEventListener = (listener) => {
    if (Object.keys(this.listeners).length === 0) {
      // Start latlng generator
      this.latLngGenerator = setInterval(this.generateLatLng, GENERATOR_TIMING);
    }

    this.listeners[listener.id] = listener.callback;
  };

  removeEventListener = (listener) => {
    delete this.listeners[listener.id || listener];

    if (Object.keys(this.listeners).length === 0) {
      // Stop latlng generator
      clearInterval(this.latLngGenerator);
    }
  };

  generateLatLng = () => {
    const northSoundRange = NORTH_BOUND - SOUTH_BOUND;
    const eastWestRange = WEST_BOUND - EAST_BOUND;

    const lat = Math.random() * northSoundRange + SOUTH_BOUND;
    const lng = Math.random() * eastWestRange + EAST_BOUND;

    this.onMessage({ data: [lat, lng] });
  };
}

export default TestSocketConnector;