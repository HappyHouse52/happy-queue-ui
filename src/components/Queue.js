import React, { Component } from 'react';
import { Item, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Search from './Search';
import Player from './Player';
import queueActions from '../actions/queue';
import searchApi from '../api/search';

class Queue extends Component {
  componentDidMount() {
    const { fetchQueue, match } = this.props;
    fetchQueue(match.params.queue);
  }

  renderQueueTracks() {
    const { tracks } = this.props;

    const trackItems = tracks.map((track, index) =>
      this.renderSingleItem(track, index)
    );
    return <Item.Group>{trackItems}</Item.Group>;
  }

  // eslint-disable-next-line class-methods-use-this
  renderSingleItem(track, index) {
    return (
      <Item key={index}>
        <Item.Image size="small" src={track.image_url} />
        <Item.Content>
          <Item.Header as="a">{track.title}</Item.Header>
          <Item.Meta>
            <span className="subtitle">{track.subtitle}</span>
          </Item.Meta>
        </Item.Content>
      </Item>
    );
  }

  render() {
    const { match, token, currentTrack } = this.props;
    return (
      <div>
        <br />
        <Header textAlign="center">{match.params.queue}</Header>
        <Search queueName={match.params.queue} />
        <Player queueName={match.params.queue} />
        {!_.isEmpty(currentTrack) ? (
          <div>
            <Header size="small">Currently Playing</Header>
            <Item.Group>{this.renderSingleItem(currentTrack, 0)}</Item.Group>
          </div>
        ) : (
          <div />
        )}
        <Divider />
        {this.renderQueueTracks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tracks: state.queue.tracks || [],
    token: state.token,
    currentTrack: state.spotify.track
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQueue: queueName => dispatch(queueActions.fetchQueue(queueName)),
    searchTracks: search => dispatch(searchApi.searchTracks(search))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
