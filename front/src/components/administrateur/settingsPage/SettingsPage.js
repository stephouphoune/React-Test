import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveSignIn } from '../../../appState/actions/user'
import { forceReset } from '../../../appState/actions/reset'
import { requestGetTasks } from '../../../appState/actions/task'
import { requestGetActivities } from '../../../appState/actions/activity'
import { requestGetProjects } from '../../../appState/actions/project'
import './SettingsPage.css';
import {Card, Row, Col, Icon, Button, Input, Select,InputNumber} from 'antd';
import Arborescence from './Arborescence';
import Duration from './Duration';


class SettingsPage extends Component{
  

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
                      <Button onClick={this.props.disconnect} type="danger">Déconnexion</Button>
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
                              <Select defaultValue="Francais">
                                  <Select.Option value="francais">Francais</Select.Option>
                                  <Select.Option value="english">English</Select.Option>
                              </Select>
                            </div>
                        </div>
                        <Duration/>
                    </Card>
                  </Col>
                </Row>
          </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  disconnect: () => {
    dispatch(receiveSignIn())
    dispatch(forceReset())
  },
  getActivities: requestGetActivities(dispatch),
  getProjects: requestGetProjects(dispatch),
  getTasks: requestGetTasks(dispatch), 
})


export default connect(null, mapDispatchToProps)(SettingsPage);
