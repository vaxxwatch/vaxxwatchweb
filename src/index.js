import {
  loadComponents,
  getState
} from 'loadable-components';

import setupSentry from './vendor/sentry';
import App from './app/app';

window.snapSaveState = () => getState();

const rootElement = document.getElementById('root');

import('idempotent-babel-polyfill')
  .then(() => import('react-dom'))
  .then((reactDom) => {
    const {render, hydrate} = reactDom;

    const loadAppClient = () => {
      hydrate(App(), rootElement);
      setupSentry();
    };
  
    const loadAppServer = () => {
      render(App(), rootElement);
    };
  
    const loadApp = () => {
      if (rootElement.hasChildNodes()) {
        loadAppClient();
      } else {
        loadAppServer();
      }
    };

    loadComponents()
      .then(loadApp)
      .catch(loadAppServer);
  });