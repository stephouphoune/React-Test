import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import AppContent from './AppContent';
import AppFooter from './AppFooter';
import {Layout} from 'antd';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Layout>  
          <AppHeader/>
          <AppContent/>
          <AppFooter/>
        </Layout>
      </div>
    );
  }
}

export default App;
