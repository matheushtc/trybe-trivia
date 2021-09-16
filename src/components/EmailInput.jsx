// React
import React, { Component } from 'react';

// PropTypes
import PropTypes from 'prop-types';

class EmailInput extends Component {
  render() {
    const { email, handleChange } = this.props;
    return (
      <label className="EmailInput" htmlFor="email-input">
        Email:
        <input
          type="text"
          id="email-input"
          className="form-control"
          data-testid="input-gravatar-email"
          placeholder="Email"
          name="email"
          value={ email }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

EmailInput.propTypes = {
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EmailInput;
