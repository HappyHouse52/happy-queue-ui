/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'semantic-ui-react';
import _ from 'lodash';
import getSpotifyApi from '../../utils/spotifyUtils';
import queueActions from '../../actions/queue';
import spotifyActions from '../../actions/spotify';

class Streamer extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    this.spotifyApi = getSpotifyApi(token);
    this.state = {
      isLoadingPlayback: true,
      isPlaying: false,
      playbackState: {},
      startedQueue: false
    };

    this.handlePlayClick = this.handlePlayClick.bind(this);
  }

  componentDidMount() {
    this.fetchPlaybackState();
    this.timer = setInterval(() => this.fetchPlaybackState(), 2000);
  }

  componentDidUpdate(prevProps) {
    const {
      currentTrack,
      queue,
      device,
      hasTrackEnded,
      setCurrentTrack,
      queueTrackEnd,
      fetchQueue,
      deleteTrack
    } = this.props;

    if (hasTrackEnded !== prevProps.hasTrackEnded && queue.tracks.length) {
      setCurrentTrack(queue.tracks[0]);
    }

    if (currentTrack !== prevProps.currentTrack) {
      this.spotifyApi
        .play({
          device_id: device.id,
          uris: [queue.tracks[0].spotify_uri]
        })
        .then(() => queueTrackEnd(false))
        .then(() => deleteTrack(queue.name, queue.tracks[0].id))
        .then(() => fetchQueue(queue.name));
    }
  }

  componentWillUnmount() {
    this.timer = null;
  }

  fetchPlaybackState() {
    this.spotifyApi
      .getMyCurrentPlaybackState()
      .catch(err => console.log('err', err))
      .then(playbackState => {
        this.setState({
          playbackState,
          isPlaying: _.isEmpty(playbackState) ? false : playbackState.is_playing
        });
      });
  }

  handleNextSong() {
    const { startedQueue } = this.state;
    const { setCurrentTrack, queue, deleteTrack, fetchQueue } = this.props;

    if (!startedQueue && !_.isEmpty(queue.tracks)) {
      new Promise(resolve => resolve(setCurrentTrack(queue.tracks[0])))
        .then(() => deleteTrack(queue.name, queue.tracks[0].id))
        .then(() => fetchQueue(queue.name))
        .then(() => {
          this.setState({ startedQueue: true });
          this.fetchPlaybackState();
        });
    }
  }

  handlePlayClick(playbackState) {
    const { device } = this.props;
    if (playbackState.is_playing) {
      this.spotifyApi.pause().then(() => this.fetchPlaybackState());
    } else {
      this.spotifyApi
        .play({
          device_id: device.id
        })
        .then(() => this.fetchPlaybackState());
    }
  }

  renderPlayPauseButton(playbackState) {
    if (playbackState.is_playing) {
      return <Icon name="pause" />;
    }

    return <Icon name="play" />;
  }

  renderPlayButton(playbackState) {
    return (
      <Button circular icon onClick={() => this.handlePlayClick(playbackState)}>
        {this.renderPlayPauseButton(playbackState)}
      </Button>
    );
  }

  render() {
    const { playbackState } = this.state;
    this.handleNextSong();

    if (playbackState) {
      return this.renderPlayButton(playbackState);
    }
    return <Icon loading name="circle notch" />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    currentTrack: state.spotify.track,
    device: state.spotify.device,
    queue: state.queue,
    hasTrackEnded: state.queue.isTrackEnd
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queueTrackEnd: isEnd => dispatch(queueActions.setSongEnd(isEnd)),
    setCurrentTrack: track => dispatch(spotifyActions.setCurrentTrack(track)),
    fetchQueue: queueName => dispatch(queueActions.fetchQueue(queueName)),
    deleteTrack: (queueName, trackId) =>
      dispatch(queueActions.deleteTrack(queueName, trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(Streamer);
