import { hydrate, render } from 'react-dom';

import setupSentry from './vendor/sentry';

import App from './app/app';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(App(), rootElement);
  setupSentry();
} else {
  render(App(), rootElement);
}
