// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class ViewSettings extends Component {
  render() {
    const { openSettings } = this.props;
    return (
      <button
        type="button"
        className="ViewSettings btn btn-secondary"
        data-testid="btn-settings"
        onClick={ openSettings }
      >
      <img style={{position: 'relative', left:'-30%', marginLeft: '1vw'}} src='http://cdn.onlinewebfonts.com/svg/img_161329.png' width='20px' />
        Configurações
      </button>
    );
  }
}

ViewSettings.propTypes = {
  openSettings: PropTypes.func.isRequired,
};

export default ViewSettings;
