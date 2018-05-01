import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestGetActivities } from '../appState/actions/activity'
import { requestGetProjects } from '../appState/actions/project'
import { requestGetLabels } from '../appState/actions/label'
import { requestGetUsers } from '../appState/actions/users'
import { requestGetTasks } from '../appState/actions/task'
import { requestGetWorkdays } from '../appState/actions/workday'
import { getEvents } from '../appState/actions/event'
import { getAdvancement } from '../appState/actions/advancement'
import './App.css';
import AppContent from './login/AppContent';
import Login from './login/Login';
import { Layout } from 'antd';


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
      nextProps.getUsers()
      nextProps.getTasks()
      nextProps.getWorkdays()
      nextProps.getEvents()
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
  getUsers: requestGetUsers(dispatch),
  getTasks: requestGetTasks(dispatch), 
  getWorkdays: requestGetWorkdays(dispatch),
  getEvents: getEvents(dispatch),
  getAdvancement: getAdvancement(dispatch),
})

export default connect(
  mapStateToProps, 
  mapDispatchtoProps
)(App);
