import {
  LOAD_QUEUE_REQUEST,
  LOAD_QUEUE_SUCCESS,
  LOAD_QUEUE_FAILURE,
  DELETE_TRACK_REQUEST,
  DELETE_TRACK_SUCCESS,
  DELETE_TRACK_FAILURE,
  SET_TRACK_STATE,
  ADDED_TRACK,
  SET_CURRENT_TRACK
} from '../constants/ActionTypes';
import QueueApi from '../api/queue';

const fetchQueue = queue => dispatch => {
  dispatch({
    type: LOAD_QUEUE_REQUEST
  });
  QueueApi.fetchQueue(queue)
    .then(receivedQueue =>
      dispatch({
        type: LOAD_QUEUE_SUCCESS,
        payload: receivedQueue
      })
    )
    .catch(err =>
      dispatch({
        type: LOAD_QUEUE_FAILURE,
        payload: err
      })
    );
};

const addTrack = (track, queueName) => dispatch => {
  QueueApi.addTrack(track, queueName).then(newTrack =>
    dispatch({
      type: ADDED_TRACK,
      payload: newTrack
    })
  );
};

const getNextTrack = queueName => dispatch => {
  QueueApi.getNextTrack(queueName).then(track =>
    dispatch({
      type: SET_CURRENT_TRACK,
      payload: track
    })
  );
};

const deleteTrack = (queueName, trackId) => dispatch => {
  dispatch({
    type: DELETE_TRACK_REQUEST
  });
  QueueApi.deleteTrack(queueName, trackId)
    .then(track =>
      dispatch({
        type: DELETE_TRACK_SUCCESS,
        payload: track
      })
    )
    .catch(err =>
      dispatch({
        type: DELETE_TRACK_FAILURE,
        payload: err
      })
    );
};

const setSongEnd = isEnd => dispatch => {
  dispatch({ type: SET_TRACK_STATE, payload: isEnd });
};

export default {
  fetchQueue,
  addTrack,
  getNextTrack,
  deleteTrack,
  setSongEnd
};
