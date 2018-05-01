import React, { Component } from 'react';
import './SettingsPage.css';
import {Card, Row, Col, Icon, Button, Input, Select,InputNumber} from 'antd';
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
                        <div className="URLContainer">
                            <div className="URLText">
                              URL de l'Agenda :
                            </div>
                            <div className="URL">
                              <Input 
                                placeholder="Adresse web de l'agenda"
                              />
                            </div>
                        </div>
                        <div className="LanguageContainer">
                            <div className="LanguageText">
                              Langue : 
                            </div>
                            <div className="Language">
                              <Select defaultValue="Francais" onChange={handleChange}>
                                  <Select.Option value="francais">Francais</Select.Option>
                                  <Select.Option value="english">English</Select.Option>
                              </Select>
                            </div>
                        </div>
                        <Row type="flex" justify="center">
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
