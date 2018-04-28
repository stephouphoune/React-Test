import React, { Component } from 'react';
import {Row,Col, Progress, Button, Popover} from 'antd';
import moment from 'moment'
import './HomePage.css';
import Agenda from './Agenda';
import Manage from './card/Manage';

class HomePage extends Component{
  state = {
    percent: 0,
    selectedDate: moment(), 

  }

  actualize = (value) => {
    let percent = this.state.percent + Number((value).toFix(1));
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  }

  handleDateSelected = selectedDate => {
    console.log('selectedDate', selectedDate)
    this.setState({
      selectedDate
    })
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
              <Manage/>
            </Row>
            <Row style={{marginTop:"2rem"}}  type="flex" align="middle">
              <Col span={20}>
              <Progress style={{width:"100%"}} format={this.state.format} percent={this.state.percent}/>
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

export default HomePage;