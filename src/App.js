import React, { Component } from 'react';
import './App.css';
import AppContent from './enseignant/AppContent';
import { Layout } from 'antd';

class App extends Component {

  render() {
    return (
      <Layout className="App">  
        <AppContent/>
      </Layout>
    );
  }
}

export default App;
