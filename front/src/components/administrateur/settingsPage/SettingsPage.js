import React, { Component } from 'react';
import './SettingsPage.css';
import {Card, Row, Col, Icon, Button, Input, Select,InputNumber} from 'antd';
import OptionChoice from './OptionChoice';
import Arborescence from './Arborescence';

function handleChange(value) {
  console.log(`selected ${value}`);
}

function onChange(value) {
  console.log('changed', value);
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
                <Row type="flex">
                  <Col span={16}>
                    <Arborescence/>
                  </Col>
                  <Col span={8}>
                    <Row type="flex" justify="end">
                      <Button type="danger">Déconnexion</Button>
                    </Row>
                    <Row type="flex" justify="center">
                        <OptionChoice/>
                    </Row>
                    <Row type="flex" justify="start">
                        <Select defaultValue="Francais" onChange={handleChange}>
                            <Select.Option value="francais">Francais</Select.Option>
                            <Select.Option value="english">English</Select.Option>
                        </Select>
                    </Row>
                    <Row type="flex" justify="start" className="Duree">
                        <Select style={{width:200}} placeholder="Sélectionnez un jour" onChange={handleChange}>
                            <Select.Option value="lundi">Lundi</Select.Option>
                            <Select.Option value="mardi">Mardi</Select.Option>
                            <Select.Option value="mercredi">Mercredi</Select.Option>
                            <Select.Option value="jeudi">Jeudi</Select.Option>
                            <Select.Option value="vendredi">Vendredi</Select.Option>
                        </Select>
                        <InputNumber className="increment"
                            defaultValue={8}
                            min={0}
                            max={10}
                            step={1}
                            formatter={value => `${value} H`}
                            parser={value => value.replace('H', '')}
                            onChange={onChange}
                        />
                    </Row>
                    <Row type="flex" justify="center">
                      <Button type="primary" ghost loading={this.state.loading} onClick={this.enterLoading}>
                         Enregistrer les modifications
                      </Button>
                    </Row>
                  </Col>
                </Row>
          </div>
    );
  }
}

export default SettingsPage;
