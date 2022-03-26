import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import tokenActions from '../actions/token';

// eslint-disable-next-line react/prefer-stateless-function
class RedirectSso extends Component {
  render() {
    const { fetchTokenSuccess } = this.props;
    const hash = this.props.location.hash.substring(1);
    const accessString = hash.indexOf('&');
    const stateString = hash.lastIndexOf('&');

    /* 13 because that bypasses 'access_token' string */
    const accessToken = hash.substring(13, accessString);
    const state = hash.substring(stateString + 7);
    fetchTokenSuccess(accessToken);

    console.log(accessToken, state);

    const queueName = decodeURIComponent(state);
    const path = `/${queueName}`;
    return <Redirect to={path} />;
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTokenSuccess: token => dispatch(tokenActions.fetchTokenSuccess(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedirectSso);
