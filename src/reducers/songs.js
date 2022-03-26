import { ADDED_TRACK, REMOVED_SONG } from '../constants/ActionTypes';

const songs = (state = [], action) => {
  switch (action.type) {
    case ADDED_TRACK:
      return [...state, action.songId];
    case REMOVED_SONG:
      return state.filter(id => id !== action.songId);
    default:
      return state;
  }
};
export default songs;
