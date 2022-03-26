import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Script from 'react-load-script';
import Devices from './player/Devices';
import Streamer from './player/Streamer';
import spotifyActions from '../actions/spotify';
import queueActions from '../actions/queue';

const clientId = 'fe8991cd9f9840c4874815c864841906';
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const redirectUri = 'https://dev.domain.tld:80';
const scopes = [
  'streaming',
  'user-read-email',
  'user-read-private',
  'user-library-read',
  'user-library-modify',
  'user-read-playback-state',
  'user-modify-playback-state'
];

class Player extends Component {
  constructor(props) {
    super(props);

    _.bindAll(this, 'renderOauthFlow', 'setTrackEnd');
  }

  componentDidMount() {
    const { token, handleNewDevice } = this.props;
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('hit this now');
        this.player = new window.Spotify.Player({
          name: 'Happy Queue',
          getOAuthToken: cb => {
            cb(token);
          }
        });
        this.player.addListener('ready', handleNewDevice);

        this.player.addListener('player_state_changed', state => {
          console.log(state);

          if (
            this.state &&
            state.track_window.previous_tracks.find(
              x => x.id === state.track_window.current_track.id
            ) &&
            !this.state.paused &&
            state.paused
          ) {
            console.log('Track ended');
            this.setTrackEnd(true);
          }
          this.state = state;
        });
        this.player.connect();
      };
    }
  }

  componentDidUpdate(prevProps) {
    const { isTrackEnd } = this.props;
    if (isTrackEnd === prevProps.isTrackEnd) {
      return false;
    }
    return true;
  }

  setTrackEnd(isEnd) {
    const { queueTrackEnd } = this.props;
    queueTrackEnd(isEnd);
  }

  renderOauthFlow() {
    const { queueName } = this.props;
    const queueNameEncoded = encodeURIComponent(queueName);
    return (
      <a
        className="btn btn--loginApp-link"
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&state=${queueNameEncoded}&scope=${scopes.join(
          '%20'
        )}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderDevices() {
    const { device } = this.props;
    return (
      <div>
        <Script url="https://sdk.scdn.co/spotify-player.js" />

        {!_.isEmpty(device) && (
          <div>
            <Devices />
            <Streamer />
          </div>
        )}
      </div>
    );
  }

  render() {
    const { token } = this.props;
    if (token) {
      return this.renderDevices();
    }
    return this.renderOauthFlow();
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    device: state.spotify.device,
    trackEnded: state.queue.isTrackEnd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queueTrackEnd: isEnd => dispatch(queueActions.setSongEnd(isEnd)),
    handleNewDevice: ({ device_id }) =>
      dispatch(
        spotifyActions.deviceCreateSuccess({
          id: device_id,
          name: 'Happy Queue'
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
