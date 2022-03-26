import { ADDED_TRACK } from '../constants/ActionTypes';

export const addSong = songId => ({
  type: ADDED_TRACK,
  songId
});
