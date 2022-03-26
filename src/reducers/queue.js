import {
  LOAD_QUEUE_REQUEST,
  LOAD_QUEUE_SUCCESS,
  LOAD_QUEUE_FAILURE,
  SET_TRACK_STATE,
  ADDED_TRACK
} from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  isTrackEnd: false
};

const queue = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUEUE_REQUEST:
      return { ...state, isFetching: true };
    case LOAD_QUEUE_SUCCESS:
      return { ...state, ...action.payload, isFetching: false };
    case LOAD_QUEUE_FAILURE:
      return { ...state, ...state, isFetching: false };
    case SET_TRACK_STATE:
      return { ...state, isTrackEnd: action.payload };
    case ADDED_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload]
      };
    default:
      return state;
  }
};
export default queue;
