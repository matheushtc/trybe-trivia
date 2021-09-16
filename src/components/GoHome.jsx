// React
import React, { Component } from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { resetAll, resetScore } from '../redux/actions/game';
import { resetTimer } from '../redux/actions/timer';

class GoHome extends Component {
  constructor(props) {
    super(props);

    this.redirectToHome = this.redirectToHome.bind(this);
  }

  redirectToHome() {
    const {
      history,
      resetAllDispatch,
      resetScoreDispatch,
      resetTimerDispatch,
    } = this.props;
    resetTimerDispatch();
    resetScoreDispatch();
    resetAllDispatch();
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        className="GoHome btn btn-primary"
        data-testid="btn-go-home"
        onClick={ () => this.redirectToHome() }
      >
        Voltar para a tela inicial
      </button>
    );
  }
}

GoHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  resetAllDispatch: PropTypes.func.isRequired,
  resetScoreDispatch: PropTypes.func.isRequired,
  resetTimerDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetAllDispatch: () => dispatch(resetAll()),
  resetScoreDispatch: () => dispatch(resetScore()),
  resetTimerDispatch: () => dispatch(resetTimer()),
});

export default withRouter(connect(null, mapDispatchToProps)(GoHome));
