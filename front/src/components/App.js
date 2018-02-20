import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import AppContent from './enseignant/AppContent';
import Login from './login/Login';
import { Layout } from 'antd';

class App extends Component {

  render() {
    const { token } = this.props;
    return (
      <Layout className="App">
      {token ? <AppContent /> : <Login />}
      {token}
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  token: store.user.token
});

export default connect(mapStateToProps)(App);
