import { ADDED_TRACK } from '../constants/ActionTypes';

const track = (state = [], action) => {
  switch (action.type) {
    case ADDED_TRACK:
      return action.payload;
    default:
      return state;
  }
};
export default track;
