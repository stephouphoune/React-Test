import React, { Component } from 'react';
import './SettingsPage.css';
import { connect } from 'react-redux';
import { receiveSignIn, modifyUrlCalendar } from '../../../appState/actions/user'
import { forceReset } from '../../../appState/actions/reset'
import {Card, Row, Col, Icon, Button, Input, Select, message} from 'antd';
import Login from '../../login/Login'
function handleChange(value) {
  console.log(`selected ${value}`);
}

class SettingsPage extends Component{

  state = {
    urlCalendarValue:this.props.url
  }
  
  enterLoading = () => {
    this.props.modifyUrlCalendar(this.state.urlCalendarValue)
    message.success(`Votre demande a bien été prise en compte !`);
  }
  
  onChangeUrl = (event) => {
    this.setState({
      urlCalendarValue:event.target.value
    })
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
                            value={this.state.urlCalendarValue}
                            onChange={this.onChangeUrl}
                          />
                        </div>
                    </div>
                  </Col>
                  <Col span={18} className="Deconnexion">
                  <Button onClick={this.props.disconnect} type="danger">Déconnexion</Button>
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
                  <Button style={{marginTop:"3rem"}} type="primary" ghost onClick={this.enterLoading}>
                    Enregistrer les modifications
                  </Button>
                </Row>
          </div>
    );
  }
}

const mapStateToProps = store => ({
  url: store.user.url,
});

const mapDispatchToProps = dispatch => ({
  disconnect: () => {
    dispatch(receiveSignIn())
    dispatch(forceReset())
  },
  modifyUrlCalendar:modifyUrlCalendar(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
