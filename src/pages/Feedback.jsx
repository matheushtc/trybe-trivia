// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Services
import getGravatar from '../services/gravatarAPI';

// Children
import { HeaderGame, PlayAgain, ViewRanking } from '../components';

import '../styles/Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
    this.renderFeedbackQuestion = this.renderFeedbackQuestion.bind(this);
  }

  componentDidMount() {
    const stateStorage = localStorage.getItem('state');
    const stateJson = JSON.parse(stateStorage);
    const { player: { gravatarEmail, name, score } } = stateJson;
    const rankingStorage = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingStorage);
    const objRanking = {
      name,
      score,
      picture: getGravatar(gravatarEmail),
    };
    const arrayRanking = [];
    if (rankingJson) {
      arrayRanking.push(...rankingJson);
    }
    arrayRanking.push(objRanking);
    localStorage.setItem('ranking', JSON.stringify(arrayRanking));
  }

  renderMessage() {
    const { assertions } = this.props;
    const three = 3;
    if (assertions < three) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  renderFeedbackQuestion() {
    const { assertions } = this.props;
    return <span data-testid="feedback-total-question">{assertions}</span>;
  }

  render() {
    const { score } = this.props;
    return (
      <section className="feedback-section">
        <HeaderGame />
        <div className="feedback-content">
          <div data-testid="feedback-text" className="feedback-text info">
            { this.renderMessage() }
          </div>
          <div data-testid="feedback-total-score" className="feedback-total-score info">
            <div className="score-content">
              { score }
            </div>
          </div>
          <div className="feedback-total-question info">
            Voce acertou
            {' '}
            { this.renderFeedbackQuestion() }
            {' '}
            pergunta(s).
          </div>
        </div>
        <div className="feedback-btn">
          <PlayAgain />
          <ViewRanking />
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  assertions: store.game.assertions, // Número de acertos
  score: store.header.score,
});

export default connect(mapStateToProps, null)(Feedback);
