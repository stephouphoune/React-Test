import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import './AppContent.css';

class AppContent extends Component {

    

    render() {
      return (
        <Layout.Content className="AppContent">
           <div className="card-container">
              <Tabs type="card">
                <Tabs.TabPane tab="Tab Title 1" key="1">
                  <p>Content of Tab Pane 1</p>
                  <p>Content of Tab Pane 1</p>
                  <p>Content of Tab Pane 1</p>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab Title 2" key="2">
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                  <p>Content of Tab Pane 2</p>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab Title 3" key="3">
                  <p>Content of Tab Pane 3</p>
                  <p>Content of Tab Pane 3</p>
                  <p>Content of Tab Pane 3</p>
                </Tabs.TabPane>
              </Tabs>
            </div>
        </Layout.Content>
      );
    }
  }
  
  export default AppContent;