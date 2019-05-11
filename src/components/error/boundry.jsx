import React from 'react';
import PropTypes from 'prop-types';

import Log from '../../helpers/logHelper';

class VWErrorBoundry extends React.PureComponent {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    if (error) {
      return { hasError: true };
    }
  }

  componentDidCatch(error, info) {
    if (error) {
      Log.error(error);
    }
    if (info) {
      Log.warn(info);
    }
  }

  render() {
    const {hasError} = this.state;
    const {children} = this.props;

    if (hasError) {
      return <h3>Something went wrong. We apologize profusely...</h3>;
    }

    return children;
  }
}

VWErrorBoundry.propTypes = {
  children: PropTypes.node.isRequired,
};

export default VWErrorBoundry;