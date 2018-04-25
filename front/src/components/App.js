import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestGetActivities } from '../../../../appState/actions/activity'
import './App.css';
import AppContent from './login/AppContent';
import Login from './login/Login';
import { Layout } from 'antd';

class App extends Component {

  componentDidMount() {

    // si il est connecté au lancement de l'app
    if (this.props.token) {
      this.props.getActivities()
    }

  }

  componentWillReceiveProps(nextProps) {

    // si l'utilisateur viens de se connecter
    if (this.props.token !== nextProps.token) {
      nextProps.getActivities()
    }

  }

  render() {
    const {token} = this.props;
    return (
      <Layout className="App">
      {token ? <AppContent /> : <Login />}
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  token: store.user.token
});

const mapDispatchToProps = dispatch => ({
  getActivities: requestGetActivities(dispatch)
})

export default connect(mapStateToProps)(App);
