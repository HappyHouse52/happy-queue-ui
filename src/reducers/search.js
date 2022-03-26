import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../constants/ActionTypes';

const initialState = {
  results: [],
  isFetching: false
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, isFetching: true };
    case SEARCH_SUCCESS:
      return { results: action.payload.tracks, isFetching: false };
    case SEARCH_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
export default search;
