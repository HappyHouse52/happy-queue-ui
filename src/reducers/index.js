import { combineReducers } from 'redux';
import songs from './songs';
import search from './search';
import queue from './queue';
import token from './token';
import spotify from './spotify';

export default combineReducers({
  songs,
  queue,
  search,
  token,
  spotify
});
