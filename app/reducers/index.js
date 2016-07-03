import {combineReducers} from 'redux';
import layout from './layout';
import game from './game';

export default combineReducers({
  layout,
  game,
});
