import { combineReducers } from 'redux';
import login from './login';
import game from './game';
import header from './header';
import timer from './timer';
import settings from './settings';

const rootReducer = combineReducers({ login, game, header, timer, settings });

export default rootReducer;
