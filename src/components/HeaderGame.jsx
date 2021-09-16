// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// Services
import gravatar from '../services/gravatarAPI';

import '../styles/Header.css';

class HeaderGame extends Component {
  render() {
    const { props: { score, playerEmail, playerName } } = this;
    const gravatarSrc = gravatar(playerEmail);
    return (
      <header>
        {/* Gravatar */}
        <img
          src={ gravatarSrc }
          id="header-profile-picture"
          data-testid="header-profile-picture"
          alt="gravatar"
          className="img-header"
        />
        {/* Nome do jogador */}
        <span
          id="header-profile-picture"
          data-testid="header-player-name"
          className="player-name"
        >
          { playerName }
        </span>
        {/* Pontuação */}
        <span
          id="header-score"
          data-testid="header-score"
          className="header-score"
        >
          { score }
        </span>
      </header>
    );
  }
}

HeaderGame.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  playerName: store.login.nome,
  playerEmail: store.login.email,
  score: store.header.score,
});

export default connect(mapStateToProps, null)(HeaderGame);
