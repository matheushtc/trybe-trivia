// React
import React, { Component } from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

class ViewRanking extends Component {
  constructor(props) {
    super(props);

    this.redirectToRanking = this.redirectToRanking.bind(this);
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-outline-success"
        data-testid="btn-ranking"
        onClick={ () => this.redirectToRanking() }
      >
        Ver Ranking
      </button>
    );
  }
}

ViewRanking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ViewRanking);
