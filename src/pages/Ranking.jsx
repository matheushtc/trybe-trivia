// React
import React, { Component } from 'react';

// Children
import { GoHome } from '../components';

// Styles
import '../styles/Ranking.css';

class Ranking extends Component {
  constructor() {
    super();
    this.returnRanking = this.returnRanking.bind(this);
  }

  returnRanking() {
    const rankingStorage = localStorage.getItem('ranking');
    const rankingJson = JSON.parse(rankingStorage);

    rankingJson.sort((a, b) => b.score - a.score);

    return rankingJson.map((item, index) => (
      <li className="Ranking-Item" key={ index }>
        <img src={ item.picture } alt="Gravatar" />
        <span className="Ranking-Name" data-testid={ `player-name-${index}` }>
          {item.name}
        </span>
        <span className="Ranking-Score" data-testid={ `player-score-${index}` }>
          Score:
          {' '}
          {item.score}
        </span>
      </li>
    ));
  }

  render() {
    return (
      <section className="Ranking">
        <div className="Ranking-Wrapper">
          <h1 data-testid="ranking-title">
            Ranking
          </h1>
          <ol className="Ranking-List">
            {
              this.returnRanking()
            }
          </ol>
          <GoHome />
        </div>
      </section>
    );
  }
}

export default Ranking;
