import { SEARCH_PATH } from '../constants/urls';

const searchTracks = search => {
  return fetch(`${SEARCH_PATH}?q=${search}`, {
    mode: 'cors',
    headers: {
      Authorization: `Basic ${btoa('dbannon:password')}`
    }
  }).then(res => res.json());
};

export default {
  searchTracks
};
