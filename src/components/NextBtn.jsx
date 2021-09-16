// React
import React from 'react';

// Router
import { withRouter } from 'react-router';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { pressNextBtn } from '../redux/actions/pressBtn';
import { toggleTimer } from '../redux/actions/timer';

class NextBtn extends React.Component {
  constructor() {
    super();
    this.triggerNextQuestion = this.triggerNextQuestion.bind(this);
  }

  clearStyles() {
    // Remove estilo da alternativa correta
    const correta = document.querySelector('#correct-answer');
    correta.classList.remove('correct-highlight');
    correta.disabled = false;

    // Remove estilo das alternativas incorretas
    const incorretas = document.querySelectorAll('.incorrect-highlight');
    incorretas.forEach((el) => {
      el.classList.remove('incorrect-highlight');
      el.disabled = false;
    });
  }

  async triggerNextQuestion() {
    const { toggleTimerDispatch, setAnswers } = this.props;
    toggleTimerDispatch();
    this.clearStyles();
    const { pushBtn, game, questionNumber } = this.props;
    const numeroDePerguntas = Object.keys(game).length;
    if (questionNumber !== (numeroDePerguntas - 1)) {
      await pushBtn();
      setAnswers();
    }
    if (questionNumber === (numeroDePerguntas - 1)) {
      this.redirectToFeedback();
    }
  }

  redirectToFeedback() {
    const { history } = this.props;
    history.push('/feedback');
  }

  render() {
    const { disable } = this.props;
    return (
      <button
        type="button"
        className="btn btn-primary next-btn"
        onClick={ () => this.triggerNextQuestion() }
        data-testid="btn-next"
        style={
          disable ? { display: 'none' } : { display: 'flex' }
        }
      >
        Próximo
      </button>
    );
  }
}

NextBtn.propTypes = {
  game: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionNumber: PropTypes.number.isRequired,
  disable: PropTypes.bool.isRequired,
  pushBtn: PropTypes.func.isRequired,
  setAnswers: PropTypes.func.isRequired,
  toggleTimerDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game.game,
  questionNumber: state.game.questionNumber,
  disable: state.game.disable,
});

const mapDispatchToProps = (dispatch) => ({
  pushBtn: () => (dispatch(pressNextBtn())),
  toggleTimerDispatch: () => dispatch(toggleTimer()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NextBtn));
