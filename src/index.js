import { hydrate, render } from 'react-dom';

import App from './app/app';

const rootElement = document.getElementById('root');

if (rootElement.hasChildNodes()) {
  hydrate(App(), rootElement);
} else {
  render(App(), rootElement);
}
