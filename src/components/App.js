import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import LoadingDots from './common/LoadingDots';

const App = ({ children, loading }, context) => (
  <div className="container-fluid">
    <Header />
    <div>{ children }</div>

    { loading && <LoadingDots /> }
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ callsInProgress }) => ({
  loading: (callsInProgress.length > 0)
});

export default connect(mapStateToProps)(App);