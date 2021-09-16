// React
import React from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import validateLogin from '../redux/actions/validateLogin';
import { setGameInfo } from '../redux/actions/game';

// Services
import { apiTrivia } from '../services/apiTrivia';
import { putTokenInLocalStorage } from '../services/servicesAPI';

// Children
import { EmailInput, NameInput, ViewSettings, SubmitLogin, Hero } from '../components';

// Styles
import '../styles/Login.css';

// Static
const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.openSettings = this.openSettings.bind(this);

    this.state = {
      nome: '',
      email: '',
    };
  }

  async setQuestions() {
    const { dispatchGameInfo, numberOfQuestions, category, difficult } = this.props;

    const token = localStorage.getItem('token') || '';

    await apiTrivia(token, numberOfQuestions, category, difficult)
      .then((results) => dispatchGameInfo(results));

    // Redirecionar para a tela de jogo
    const { history } = this.props;
    history.push('/game');
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async submitLogin() {
    // Guardar login na store
    const { dispatchValidateLogin } = this.props;
    const { nome, email } = this.state;
    await dispatchValidateLogin({ nome, email });

    // Guardar token no local storage
    putTokenInLocalStorage();

    // Guardar as informações de jogo na store
    await this.setQuestions();
  }

  openSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { nome, email } = this.state;
    const statusButton = !(regexEmail.test(email) && nome.length > 0);
    return (
      <main className="Login">
        <Hero />
        <div className="Login-Wrapper">
          <div className="Login-Form">
            { /* Input de Nome */ }
            <NameInput
              name={ nome }
              handleChange={ this.handleChange }
            />
            { /* Input de Email */ }
            <EmailInput
              email={ email }
              handleChange={ this.handleChange }
            />
            { /* Jogar */ }
            <SubmitLogin
              statusButton={ statusButton }
              submitLogin={ this.submitLogin }
            />
            <hr className="hr" />
            { /* Configurações */ }
            <ViewSettings
              openSettings={ this.openSettings }
            />
          </div>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  dispatchValidateLogin: PropTypes.func.isRequired,
  dispatchGameInfo: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  numberOfQuestions: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  difficult: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  numberOfQuestions: state.settings.numberOfQuestions,
  category: state.settings.category,
  difficult: state.settings.difficult,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchValidateLogin: (value) => dispatch(validateLogin(value)),
  dispatchGameInfo: (value) => dispatch(setGameInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
