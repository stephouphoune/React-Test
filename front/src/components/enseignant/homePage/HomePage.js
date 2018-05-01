import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row,Col, Progress, Button, Popover} from 'antd';
import moment from 'moment'
import './HomePage.css';
import Agenda from './Agenda';
import Manage from './card/Manage';
import { postEvent, getEvents, modifyEvent } from '../../../appState/actions/event'
import { getAdvancement } from '../../../appState/actions/advancement'

class HomePage extends Component{
  state = {
    percent: 0,//((this.props.advancement.map(adv => adv["sumduration"]))/(8*60)*100).toFixed(1),
    selectedDate: moment(),
  }

  //mettre dans le state percent = advancement/nombre d'heures de la journée
  //Il faut donc récupérer ici le nombre d'heure de la journée
  componentDidMount(){
    this.props.getAdvancement(this.state.selectedDate.toDate())
    //console.log('fjizojfijezijfoizejfoi',((this.props.advancement.map(adv => adv["sumduration"]))/(8*60)*100).toFixed(1))
    this.setState({
      percent:10
    })
    //console.log('hello-------', this.props.advancement)
  }

  componentWillReceiveProps(){
    //this.props.getAdvancement(this.state.selectedDate.toDate())
    //console.log("hello-----------------")
  }

  handleDateSelected = selectedDate => {
    this.props.getEvents(selectedDate.toDate())
    console.log('fjizojfijezijfoizejfoi',((this.props.advancement.map(adv => adv["sumduration"]))/(8*60)*100).toFixed(1))
    this.setState({
      selectedDate,
    })
  }

  handleAddEvent = (partialEvent) => {
    this.props.postEvent({...partialEvent, date: this.state.selectedDate})
  }

  handleEditEvent = (event) => {
    this.props.modifyEvent(event)
  }

  render() {
    return (
        <Row type="flex" style={{marginTop:10}}>
          <Col span={8}>
            <Agenda 
              onSelect={this.handleDateSelected}
              selectedDate={this.state.selectedDate}
            />
          </Col>
          <Col span={16}>
            <Row>
              <Manage
                onAddEvent={this.handleAddEvent}
                onEditEvent={this.handleEditEvent}
                selectedDate={this.state.selectedDate}
              />
            </Row>
            <Row style={{marginTop:"2rem"}}  type="flex" align="middle">
              <Col span={20}>
              <Progress 
                style={{width:"100%"}}
                percent={this.state.percent}/>
              </Col>
              <Col span={4}>
              <Popover content={<Button style={{width:"100%"}}>Oui</Button>} placement="topRight" trigger="click" title="Êtes-vous sûr de vouloir terminer la journée ?"> 
                <Button style={{width:"100%"}} type="danger" ghost>Remplir les trous ?</Button>
              </Popover>
              </Col>
            </Row>
          </Col>
        </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  postEvent: postEvent(dispatch),
  getEvents: getEvents(dispatch), 
  modifyEvent: modifyEvent(dispatch),
  getAdvancement: getAdvancement(dispatch),
})

const mapStateToProps = store => ({
  advancement: store.advancement.advancement,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
