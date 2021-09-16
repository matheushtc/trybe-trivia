import {
  TOGGLE_TIMER,
  SET_TIMER,
  RESET_TIMER,
} from '../actions/timer';

const INITIAL_STATE = {
  timer: 30, // Temporizador
  timerOn: false, // Liga/Desliga temporizador
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOGGLE_TIMER:
    return {
      ...state, timerOn: !state.timerOn,
    };
  case SET_TIMER:
    return {
      ...state, timer: action.payload,
    };
  case RESET_TIMER:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default timer;
