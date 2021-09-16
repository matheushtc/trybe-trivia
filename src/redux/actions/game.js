// Actions
export const SET_GAME_INFO = 'SET_GAME_INFO';
export const SET_ANSWERS = 'SET_ANSWERS';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';
export const SET_SCORE = 'SET_SCORE';
export const RESET_ALL = 'RESET_ALL';
export const RESET_SCORE = 'RESET_SCORE';

// Action Creators
export const setGameInfo = (payload) => ({
  type: SET_GAME_INFO,
  payload,
});

export const setAnswers = (payload) => ({
  type: SET_ANSWERS,
  payload,
});

export const setAssertions = (assertions) => ({
  type: SET_ASSERTIONS,
  assertions,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const resetAll = () => ({
  type: RESET_ALL,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
