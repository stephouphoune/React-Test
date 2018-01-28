import React, { Component } from 'react';
import { Layout, Menu, Icon} from 'antd';
import './AppHeader.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class AppHeader extends Component {

    state = {
      current: 'mail',
    }
    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }

    render() {
      return (
        <Layout.Header className="AppHeader">
          <Menu
            className="AppHeaderMenu"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '62px' }}
          >
            <Menu.Item key="1">
              Mon Agenda
            </Menu.Item>
            <Menu.Item key="2">
              Analyse
            </Menu.Item>
            <Menu.Item key="3">
              Paramètres
            </Menu.Item>
          </Menu>
        </Layout.Header>
      );
    }
  }
  
  export default AppHeader;