import { LOGIN_VALIDATE } from '../actions/validateLogin';

const INITIAL_STATE = {
  email: '',
  nome: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_VALIDATE:
    return {
      email: action.payload.email,
      nome: action.payload.nome,
    };
  default:
    return state;
  }
};

export default login;
