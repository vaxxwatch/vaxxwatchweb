import * as Sentry from '@sentry/browser';

export default () => {
    Sentry.init({ dsn: 'https://3785a3a90480477db247f1ab72d0a053@sentry.io/1414929' });
};