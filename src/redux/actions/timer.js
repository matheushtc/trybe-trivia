// Actions
export const TOGGLE_TIMER = 'TOGGLE_TIMER';
export const SET_TIMER = 'SET_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

// Action Creators
export const toggleTimer = () => ({
  type: TOGGLE_TIMER,
});

export const setTimerGlobal = (payload) => ({
  type: SET_TIMER,
  payload,
});

export const resetTimer = () => ({
  type: RESET_TIMER,
});
