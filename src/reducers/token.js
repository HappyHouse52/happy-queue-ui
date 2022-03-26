import { FETCH_TOKEN_SUCCESS } from '../constants/ActionTypes';

const token = (state = '', action) => {
  switch (action.type) {
    case FETCH_TOKEN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
export default token;
