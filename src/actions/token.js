import { FETCH_TOKEN_SUCCESS } from '../constants/ActionTypes';

const fetchTokenSuccess = token => dispatch =>
  dispatch({
    type: FETCH_TOKEN_SUCCESS,
    payload: token
  });

export default {
  fetchTokenSuccess
};
