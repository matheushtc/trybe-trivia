import { NEXTBUTTON_PRESS, QUESTION_PRESS } from '../actions/pressBtn';
import {
  SET_GAME_INFO,
  SET_ANSWERS,
  SET_ASSERTIONS,
  RESET_ALL,
} from '../actions/game';

const INITIAL_STATE = {
  game: [], // O array de perguntas
  questionNumber: 0, // O número da pergunta
  answers: [], // Array de respostas
  assertions: 0, // Número de acertos
  disable: true, // Habilitar nova pergunta
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXTBUTTON_PRESS:
    return {
      ...state, questionNumber: state.questionNumber + 1, disable: true,
    };
  case QUESTION_PRESS:
    return {
      ...state, disable: false,
    };
  case SET_GAME_INFO:
    return {
      ...state, game: action.payload,
    };
  case SET_ANSWERS:
    return {
      ...state, answers: action.payload,
    };
  case SET_ASSERTIONS:
    return {
      ...state, assertions: (state.assertions + action.assertions),
    };
  case RESET_ALL:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default game;
