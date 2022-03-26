import Spotify from 'spotify-web-api-js';

const getSpotifyApi = token => {
  const spotify = new Spotify();
  spotify.setAccessToken(token);
  return spotify;
};

export default getSpotifyApi;
