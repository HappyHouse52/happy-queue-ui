import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../constants/ActionTypes';
import searchApi from '../api/search';

const searchTracks = search => dispatch => {
  dispatch({
    type: SEARCH_REQUEST
  });
  searchApi
    .searchTracks(search)
    .catch(err =>
      dispatch({
        type: SEARCH_FAILURE
      })
    )
    .then(json =>
      dispatch({
        type: SEARCH_SUCCESS,
        payload: json
      })
    );
};

export default {
  searchTracks
};
