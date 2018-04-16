import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import './AppContent.css';

import HomePage from './homePage/HomePage'
import SettingsPage from './settingsPage/SettingsPage'
import StatsPage from './statsPage/StatsPage'

class AppContent extends Component {

  render() {
    return (
      <Layout.Content className="AppContent">
        <div className="card-container">
          <Tabs type="card">
            <Tabs.TabPane tab="Gestion" key="1">
              <HomePage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Analyse" key="2">
              <StatsPage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Paramètres" key="3">
              <SettingsPage />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Layout.Content>
    );
  }
}
  
export default AppContent;