import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import './AppContent.css';
import HomePage from './home_page/HomePage'
import SettingsPage from './settings_page/SettingsPage'
import StatsPage from './stats_page/StatsPage'

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
                <Tabs.TabPane tab="Préférences" key="3">
                  <SettingsPage />
                </Tabs.TabPane>
              </Tabs>
            </div>
        </Layout.Content>
      );
    }
  }
  
  export default AppContent;