import React, { Component } from 'react';
import './SettingsPage.css';
import {Card, Row, Col, Icon, Button, Input, Select,InputNumber} from 'antd';
import OptionChoice from './OptionChoice';
import Arborescence from './Arborescence';
import Duration from './Duration';

function handleChange(value) {
  console.log(`selected ${value}`);
}

function onChange(value) {
  console.log('changed', value);
}

class SettingsPage extends Component{

  state = {
    loading: false,
  }
  
  enterLoading = () => {
    this.setState({ loading: true });
  }
  

  render() {
    return (
        <div>
                <Row type="flex">
                  <Col span={16}>
                    {/*Appel du composant ARBORESCENCE*/}
                    <Arborescence/>
                  </Col>
                  <Col span={8}>
                    <Row type="flex" justify="end">
                      <Button type="danger">Déconnexion</Button>
                    </Row>
                    <Card className="Parametres">
                        <Row type="flex" justify="center">
                            {/*Appel du composant OPTIONCHOICE*/}
                            <OptionChoice/>
                        </Row>
                        <Row type="flex" justify="start">
                            <Select className="Language" defaultValue="Francais" onChange={handleChange}>
                                <Select.Option value="francais">Francais</Select.Option>
                                <Select.Option value="english">English</Select.Option>
                            </Select>
                        </Row>
                        <Row type="flex" justify="start">
                            {/*Appel du composant DAY*/}
                            <Duration/>
                        </Row>
                        <Row type="flex" justify="center">
                          <Button className="Enregistrer" type="primary" ghost loading={this.state.loading} onClick={this.enterLoading}>
                            Enregistrer les modifications
                          </Button>
                        </Row>
                    </Card>
                  </Col>
                </Row>
          </div>
    );
  }
}

export default SettingsPage;
