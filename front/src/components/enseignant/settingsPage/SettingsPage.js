import React, { Component } from 'react';
import './SettingsPage.css';
import {Card, Row, Col, Icon, Button, Input, Select} from 'antd';
import OptionChoice from './OptionChoice';

function handleChange(value) {
  console.log(`selected ${value}`);
}

class SettingsPage extends Component{

  state = {
    loading: false,
    iconLoading: false,
  }
  
  enterLoading = () => {
    this.setState({ loading: true });
  }
  
  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  }

  render() {
    return (
        <div>
                <Row>
                  <Col span={12}>
                      <OptionChoice/>
                  </Col>
                  <Col span={12} className="Deconnexion">
                      <Button type="danger">Déconnexion</Button>
                  </Col>
                </Row>

                <Row className='Row2'>
                    <Select defaultValue="Francais" onChange={handleChange}>
                        <Select.Option value="francais">Francais</Select.Option>
                        <Select.Option value="english">English</Select.Option>
                    </Select>
                </Row>

                <Row className='Row3'>
                  <Button loading={this.state.loading} onClick={this.enterLoading}>
                    Enregistrer les modifications
                  </Button>
                </Row>
          </div>
    );
  }
}

export default SettingsPage;
