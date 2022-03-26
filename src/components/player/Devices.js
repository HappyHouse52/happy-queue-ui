/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Icon, Dropdown } from 'semantic-ui-react';
import getSpotifyApi from '../../utils/spotifyUtils';

class Devices extends Component {
  constructor(props) {
    super(props);
    const { token } = this.props;
    this.spotifyApi = getSpotifyApi(token);
    this.state = { devices: [] };

    _.bindAll(this, 'handleDeviceChange');
  }

  componentDidMount() {
    this.fetchDevices();
    setInterval(() => this.fetchDevices(), 3000);
  }

  fetchDevices() {
    this.spotifyApi
      .getMyDevices()
      .then(devices => this.setState({ devices: devices.devices }));
  }

  handleDeviceChange(e, { value }) {
    console.log(value);

    this.spotifyApi.transferMyPlayback([value]);
  }

  renderDevices(devices) {
    const options = devices.map(device => ({
      key: device.id,
      text: device.name,
      value: device.id,
      content: device.name
    }));
    return (
      <Dropdown
        inline
        header="Adjust time span"
        options={options}
        defaultValue={options[0].value}
        onChange={this.handleDeviceChange}
      />
    );
  }

  render() {
    const { devices } = this.state;

    if (!_.isEmpty(devices)) {
      return this.renderDevices(devices);
    }
    return <Icon loading name="circle notch" />;
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    device: state.spotify.device
  };
};

export default connect(mapStateToProps)(Devices);
