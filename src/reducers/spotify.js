import {
  LOAD_DEVICE_SUCCESS,
  SET_CURRENT_TRACK,
  SET_CURRENT_DEVICE
} from '../constants/ActionTypes';

const initialState = {
  device: {},
  track: {}
};

const spotify = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DEVICE_SUCCESS:
    case SET_CURRENT_DEVICE:
      return { ...state, device: action.payload };
    case SET_CURRENT_TRACK:
      return { ...state, track: action.payload };
    default:
      return state;
  }
};
export default spotify;
