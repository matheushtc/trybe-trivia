// React
import { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

class GameAnswers extends Component {
  renderAnswers() {
    const { answers } = this.props;
    return (
      answers.map((el) => el)
    );
  }

  render() {
    return (
      this.renderAnswers()
    );
  }
}

GameAnswers.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object).isRequired, // Respostas
};

const mapStateToProps = (state) => ({
  answers: state.game.answers,
});

export default connect(mapStateToProps, null)(GameAnswers);
