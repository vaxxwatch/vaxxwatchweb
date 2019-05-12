import config from '../config/default';

const shouldInitializeSentry = () => {
  return config.sentryDsn &&
    typeof window !== 'undefined' &&
    window &&
    window.location &&
    window.location.href &&
    window.location.href.indexOf('vaxxwatch') > -1;
};

const setupSentry = (Sentry) => {
  Sentry.init({
    dsn: config.sentryDsn
  });
};

export default () => {
  if (shouldInitializeSentry()) {
    import('@sentry/browser').then(setupSentry);
  }
};