export const LOGIN_VALIDATE = 'LOGIN_VALIDATE';

const validateLogin = (payload) => (
  {
    type: LOGIN_VALIDATE, payload,
  }
);

export default validateLogin;
