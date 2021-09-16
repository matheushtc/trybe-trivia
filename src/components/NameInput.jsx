// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class NameInput extends Component {
  render() {
    const { name, handleChange } = this.props;
    return (
      <label className="NameInput" htmlFor="name-input">
        Nome:
        <input
          type="text"
          id="name-input"
          className="form-control"
          data-testid="input-player-name"
          placeholder="Seu apelido"
          name="nome"
          value={ name }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

NameInput.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default NameInput;
