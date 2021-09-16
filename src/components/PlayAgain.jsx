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

class PlayAgain extends Component {
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
        className="btn btn-outline-primary"
        data-testid="btn-play-again"
        onClick={ () => this.redirectToHome() }
      >
        Jogar novamente
      </button>
    );
  }
}

PlayAgain.propTypes = {
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

export default withRouter(connect(null, mapDispatchToProps)(PlayAgain));
