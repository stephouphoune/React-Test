import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestGetActivities } from '../appState/actions/activity'
import { requestGetProjects } from '../appState/actions/project'
import { requestGetLabels } from '../appState/actions/label'
import './App.css';
import AppContent from './login/AppContent';
import Login from './login/Login';
import { Layout } from 'antd';
import { RECEIVE_GET_ACTIVITIES } from '../appState/types/activity';


class App extends Component {
  componentDidMount(){

  //S'il est connecté au lancement de l'application
    if (this.props.token) {
      this.props.getActivities()
    }
  }

  componentWillReceiveProps(nextProps){

    //Si l'utilisateur vient de se connecter
    if (this.props.token !== nextProps.token){
      nextProps.getActivities()
      nextProps.getProjects()
      nextProps.getLabels()
    }
  }

  render() {
    const { token } = this.props;
    return (
      <Layout className="App">
        {token ? <AppContent /> : <Login />}
      </Layout>
      
    );
  }
}

const mapStateToProps = store => ({
  token: store.user.token,
});

const mapDispatchtoProps = dispatch => ({
  getActivities: requestGetActivities(dispatch),
  getProjects: requestGetProjects(dispatch),
  getLabels: requestGetLabels(dispatch),
})

export default connect(
  mapStateToProps, 
  mapDispatchtoProps
)(App);
