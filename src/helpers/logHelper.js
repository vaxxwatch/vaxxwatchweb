
import loadable from 'loadable-components';

const Sentry = loadable(() => import('@sentry/browser'));

const info = (info) => {
  console.log(info); // eslint-disable-line no-console
};

const warn = (warning) => {
  console.warn(warning); // eslint-disable-line no-console
};

const error = (error) => {
  console.error(error); // eslint-disable-line no-console
  Sentry.captureException(error);
};

export default {
  info,
  warn,
  error
};