import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Tabs, message} from 'antd';
import './AppContent.css';
import HomePage from '../enseignant/homePage/HomePage'
import SettingsPageAdmin from '../administrateur/settingsPage/SettingsPage'
import SettingsPage from '../enseignant/settingsPage/SettingsPage'
import StatsPage from '../enseignant/statsPage/StatsPage'
import Administration from '../administrateur/administration/Administration'

class AppContent extends Component {

  render() {
    const {isAdmin, firstName, lastName} = this.props;

    const success = () => {
      message.success('Bienvenue '+firstName+' '+lastName+' !');
    };

    return (
      <Layout.Content className="AppContent">
          <Tabs type="card">
            <Tabs.TabPane tab="Gestion" key="1">
              <HomePage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Analyse" key="2">
              <StatsPage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Paramètres" key="3">
                {isAdmin ? <SettingsPageAdmin /> : <SettingsPage/>} 
            </Tabs.TabPane>
            {isAdmin ? <Tabs.TabPane tab="Administration" key="4">
                          <Administration/>
                       </Tabs.TabPane>: null}
          </Tabs>
          {success()}
      </Layout.Content>
    );
  }
}

const mapStateToProps = store => ({
  isAdmin: store.user.isAdmin,
  firstName: store.user.firstName,
  lastName: store.user.lastName,
});
  
export default connect(mapStateToProps)(AppContent);