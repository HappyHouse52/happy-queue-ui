import {
  LOAD_DEVICE_SUCCESS,
  SET_CURRENT_DEVICE,
  SET_CURRENT_TRACK
} from '../constants/ActionTypes';

const deviceCreateSuccess = device => dispatch => {
  if (!device) return;
  dispatch({
    type: LOAD_DEVICE_SUCCESS,
    payload: device
  });
};

const setCurrentDevice = device => dispatch => {
  dispatch({
    type: SET_CURRENT_DEVICE,
    payload: device
  });
};

const setCurrentTrack = track => dispatch => {
  dispatch({
    type: SET_CURRENT_TRACK,
    payload: track
  });
};

export default {
  deviceCreateSuccess,
  setCurrentDevice,
  setCurrentTrack
};
