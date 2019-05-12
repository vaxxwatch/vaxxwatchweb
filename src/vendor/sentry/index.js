const shouldInitializeSentry = () => {
  return typeof window !== 'undefined'
    && window
    && window.location
    && window.location.href
    && window.location.href.indexOf('vaxxwatch') > -1;
};

const setupSentry = (Sentry) => {
  Sentry.init({ dsn: 'https://3785a3a90480477db247f1ab72d0a053@sentry.io/1414929' });
};

export default () => {
  if (shouldInitializeSentry()) {
    import('@sentry/browser').then(setupSentry);
  }
};