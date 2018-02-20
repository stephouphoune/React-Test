import React, { Component } from 'react';
import './App.css';
import AppContent from './enseignant/AppContent';
import Login from './login/Login';
import { Layout } from 'antd';


import { connect } from 'react-redux'

const otherComp = (props) => <div><b>{props.email}</b></div>

const OtherCompConnected = connect(
  state => ({
    email: state.user.email
  })
)(otherComp)

class App extends Component {

  render() {
    return (
      <Layout className="App">  
        <Login />
        <OtherCompConnected />
      </Layout>
    );
  }
}

export default App;
