import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestGetActivities } from '../appState/actions/activity'
import './App.css';
import AppContent from './login/AppContent';
import Login from './login/Login';
import { Layout } from 'antd';

class App extends Component {
  componentDidMount(){

  //S'il est connecté au lancement de l'application
    if (this.props.token) {
      //this.props.getActivities()
    }
  }

  componentWillReceiveProps(nextProps){

    //Si l'utilisateur vient de se connecter
    if (this.props.token !== nextProps.token){
      nextProps.getActivities()
    }
  }

  render() {
    const {token, activities} = this.props;
    return (
      <Layout className="App">
      {token ? <AppContent /> : <Login />}
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  token: store.user.token,
  activities:store.activity.activities
});

const mapDispatchtoProps = dispatch => ({
  getActivities: requestGetActivities(dispatch)
})

export default connect(
  mapStateToProps, 
  mapDispatchtoProps
)(App);
