// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class SubmitLogin extends Component {
  render() {
    const { statusButton, submitLogin } = this.props;
    return (
      <button
        disabled={ statusButton }
        type="button"
        className="SubmitLogin btn btn-primary"
        data-testid="btn-play"
        onClick={ submitLogin }
      >
      {!statusButton && <img style={{position: 'relative', left:'-42%', marginLeft: '1vw'}} src='https://wikiapk.com/wp-content/uploads/2021/06/1165645_featured.png' width='20px' /> }
        Jogar
      </button>
      );
  }
}

SubmitLogin.propTypes = {
  statusButton: PropTypes.bool.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

export default SubmitLogin;
