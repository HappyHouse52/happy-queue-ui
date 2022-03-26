import React, { Component } from 'react';
import _ from 'lodash';
import { Search as SearchBox } from 'semantic-ui-react';
import { connect } from 'react-redux';
import searchActions from '../actions/search';
import queueActions from '../actions/queue';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, value: '' };
    _.bindAll(this, 'handleResultSelect', 'handleSearchChange');
  }

  handleResultSelect(e, { result }) {
    const { addTrack, queueName } = this.props;
    this.setState({ isLoading: false, value: '' });

    addTrack(result, queueName);
  }

  handleSearchChange(e, { value }) {
    const { searchTracks } = this.props;

    if (value === '') {
      this.setState({ isLoading: false, value: '' });
    } else {
      this.setState({ isLoading: true, value });
      searchTracks(value);
    }
  }

  render() {
    const { searchResults } = this.props;

    const searchResultRenderer = ({
      title,
      subtitle,
      image_url,
      spotify_uri
    }) => [
      image_url && (
        <div key={`${spotify_uri}__image`} className="image">
          <img src={image_url} alt={title} />
        </div>
      ),
      <div key={spotify_uri} className="spotify_uri">
        {title && <div className="title">{title}</div>}
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </div>
    ];

    return (
      <SearchBox
        loading={this.state.isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={searchResults}
        value={this.state.value}
        resultRenderer={searchResultRenderer}
        fluid
        input={{ fluid: true }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    searchResults: state.search.results.map(s => ({ ...s, key: s.spotify_uri }))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchTracks: search => dispatch(searchActions.searchTracks(search)),
    addTrack: (track, queueName) =>
      dispatch(queueActions.addTrack(track, queueName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
