import React, { Component } from 'react';
import './SettingsPage.css';
import {Card, Row, Col, Icon, Button, Input, Select} from 'antd';
import Login from '../../login/Login'
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
  

  render() {
    return (
        <div>
                <Row type="flex" justify="end">
                  <Col span={6}>
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
                  </Col>
                  <Col span={18} className="Deconnexion">
                    <Button type="danger">Déconnexion</Button>
                  </Col>
                </Row>

                <div className="LanguageContainer2">
                    <div>
                      Langue : 
                    </div>
                    <div>
                      <Select defaultValue="Francais" onChange={handleChange}>
                          <Select.Option value="francais">Francais</Select.Option>
                          <Select.Option value="english">English</Select.Option>
                      </Select>
                    </div>
                </div>

                <Row type="flex" justify="center">
                  <Button style={{marginTop:"3rem"}} type="primary" ghost loading={this.state.loading} onClick={this.enterLoading}>
                    Enregistrer les modifications
                  </Button>
                </Row>
          </div>
    );
  }
}

export default SettingsPage;
