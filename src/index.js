// Async load dependencies to utilize code splitting
import('idempotent-babel-polyfill')
  .then(() => import('react-dom'))
  .then((reactDom) => {
    const App = require('./app/app').default;
    const Sentry = require('./vendor/sentry').default;
    const {
      render,
      hydrate
    } = reactDom;
    const rootElement = document.getElementById('root');

    const loadAppClient = () => {
      hydrate(App(), rootElement);
      Sentry();
    };

    const loadAppServer = () => {
      render(App(), rootElement);
    };

    if (rootElement.hasChildNodes()) {
      loadAppClient();
    } else {
      loadAppServer();
    }
  });