// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { setAnswers, setAssertions, setScore } from '../redux/actions/game';
import { toggleTimer } from '../redux/actions/timer';
import { pressQuestionBtn } from '../redux/actions/pressBtn';

// Services
import gravatar from '../services/gravatarAPI';

// Children
import { HeaderGame, NextBtn, GameTimer, GameAnswers } from '../components';

// Helpers
import shuffleAnswers from '../helpers/shuffleAnswers';
import decodeHtml from '../helpers/decodeHtml';

// Styles
import '../styles/Gamepage.css';

class Gamepage extends React.Component {
  constructor(props) {
    super(props);

    this.setAnswers = this.setAnswers.bind(this);
    this.enableNextBtn = this.enableNextBtn.bind(this);
    this.setAssertions = this.setAssertions.bind(this);
    this.addStyles = this.addStyles.bind(this);
    this.answered = this.answered.bind(this);
    this.playerLocalStorage = this.playerLocalStorage.bind(this);
    this.sendScoreToLocalStorage = this.sendScoreToLocalStorage.bind(this);
  }

  componentDidMount() {
    this.playerLocalStorage();
    const { toggleTimerDispatch } = this.props;
    this.setAnswers();
    toggleTimerDispatch();
  }

  /* As funções a seguir estão relacionadas com os eventos das respostas */
  setAnswers() {
    const {
      game,
      questionNumber,
      setAnswersDispatch,
    } = this.props;

    shuffleAnswers(
      game,
      questionNumber,
      setAnswersDispatch,
      this.answered,
    ); // Salva as respostas na chave answers do estado global
  }

  setAssertions(target) {
    const { setAssertionsDispatch } = this.props;
    // Acertos
    let assertions = 0;

    if (target.id === 'correct-answer') {
      assertions += 1;
    }

    const previous = JSON.parse(
      localStorage.getItem('state'),
    );

    const updated = previous;

    updated.player.assertions += assertions;

    localStorage.setItem('state', JSON.stringify(updated));
    setAssertionsDispatch(assertions);
  }

  playerLocalStorage() {
    const { props: { playerEmail, playerName } } = this;
    /*
      state: {
          player: {
          name,
          assertions,
          score,
          gravatarEmail
        },
      }
    */
    const player = { player: {
      name: playerName,
      assertions: 0,
      score: 0,
      gravatarEmail: gravatar(playerEmail),
    } };

    window.localStorage.setItem('state', JSON.stringify(player));
  }

  enableNextBtn() {
    const { enableNextBtnDispatch } = this.props;
    enableNextBtnDispatch();
  }

  addStyles() {
    // Adiciona estilo para a alternativa correta
    const correta = document.querySelector('#correct-answer');
    correta.classList.add('correct-highlight');

    // Disabilita botões de resposta
    correta.disabled = true;

    // Adiciona estilo para as alternativas incorretas
    const incorretas = document.querySelectorAll('.incorrect-answer');
    incorretas.forEach((el) => {
      el.classList.add('incorrect-highlight');

      // Disabilita botões de resposta
      el.disabled = true;
    });
  }

  sendScoreToLocalStorage(target) {
    if (target.id === 'correct-answer') {
      // Obtendo dados
      const { timer, scoreDispatch } = this.props;
      // = this.state utilizar o timer do state;
      const { game, questionNumber } = this.props;
      const { difficulty } = game[questionNumber];
      // Utilizando variaveis de controle
      const obj = { hard: 3, medium: 2, easy: 1 };
      let valor;
      switch (difficulty) {
      case 'hard':
        valor = obj.hard;
        break;
      case 'medium':
        valor = obj.medium;
        break;
      case 'easy':
        valor = obj.easy;
        break;
      default:
      }
      // Obtendo dados do localStorage
      const state = JSON.parse(localStorage.getItem('state'));
      const defaultReward = 10;
      state.player.score += defaultReward + valor * Math.round(parseInt(timer*100,12)/100);
      // devolvendo os dados para o localStorage
      localStorage.setItem('state', JSON.stringify(state));
      scoreDispatch(state.player.score);
    }
  }

  answered({ target }) {
    const { toggleTimerDispatch } = this.props;
    // Desligar timer
    toggleTimerDispatch();

    // Estilos
    this.addStyles();

    // Atualizar pontuação
    this.sendScoreToLocalStorage(target);
    this.setAssertions(target);

    // Habilitar nova pergunta
    this.enableNextBtn();
  }

  render() {
    const { timer, game, questionNumber } = this.props;
    const { category, question } = game[questionNumber];

    return (
      <section className="Gamepage">
        <HeaderGame />
        <GameTimer
          addStyles={ this.addStyles }
          enableNextBtn={ this.enableNextBtn }
        />
        <div className="questions-content">
          <progress value={ timer-0.5 } max={ 30 } />
          <div className="question-content">
            <h3 data-testid="question-category">
              { category }
            </h3>
            <p data-testid="question-text">
              { decodeHtml(question) }
            </p>
          </div>
          <div className="game-answers">
            <GameAnswers />
          </div>
        </div>
        <NextBtn setAnswers={ this.setAnswers } />
      </section>);
  }
}

Gamepage.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  game: PropTypes.arrayOf(PropTypes.object).isRequired, // Array de perguntas
  questionNumber: PropTypes.number.isRequired, // Número da pergunta
  timer: PropTypes.number.isRequired, // Número do tempo
  setAnswersDispatch: PropTypes.func.isRequired, // Salvar respostas
  setAssertionsDispatch: PropTypes.func.isRequired, // Salvar pontuação
  enableNextBtnDispatch: PropTypes.func.isRequired, // Habilitar nova pergunta
  toggleTimerDispatch: PropTypes.func.isRequired, // Ligar/Desligar timer
  scoreDispatch: PropTypes.func.isRequired, // Ligar/Desligar timer
};

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
  game: state.game.game,
  questionNumber: state.game.questionNumber,
  playerName: state.login.nome,
  playerEmail: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  setAnswersDispatch: (payload) => dispatch(setAnswers(payload)),
  setAssertionsDispatch: (payload) => dispatch(setAssertions(payload)),
  enableNextBtnDispatch: (payload) => dispatch(pressQuestionBtn(payload)),
  toggleTimerDispatch: () => dispatch(toggleTimer()),
  scoreDispatch: (payload) => dispatch(setScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage);
