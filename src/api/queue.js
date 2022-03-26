import { QUEUE_PATH } from '../constants/urls';

const fetchQueue = queueName => {
  return fetch(`${QUEUE_PATH}/${queueName}?sortOrder=QUEUE_TIME`, {
    mode: 'cors',
    headers: {
      Authorization: `Basic ${btoa('dbannon:password')}`
    }
  }).then(res => res.json());
};

const addTrack = (track, queueName) => {
  return fetch(`${QUEUE_PATH}/${queueName}/track`, {
    mode: 'cors',
    headers: {
      Authorization: `Basic ${btoa('dbannon:password')}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(track)
  }).then(res => res.json());
};

const getNextTrack = queueName => {
  return fetch(`${QUEUE_PATH}/${queueName}/next`, {
    mode: 'cors',
    headers: {
      Authorization: `Basic ${btoa('dbannon:password')}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then(res => res.json());
};

const deleteTrack = (queueName, trackId) => {
  return fetch(`${QUEUE_PATH}/${queueName}/track/${trackId}`, {
    mode: 'cors',
    headers: {
      Authorization: `Basic ${btoa('dbannon:password')}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  }).then(res => res.json());
};

export default {
  fetchQueue,
  addTrack,
  getNextTrack,
  deleteTrack
};
