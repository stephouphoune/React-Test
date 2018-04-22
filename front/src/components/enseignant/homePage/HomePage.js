import React, { Component } from 'react';
import {Row,Col, Progress} from 'antd';
import './HomePage.css';
import Agenda from './Agenda';
import Card from './card/Card';

class HomePage extends Component{
  state = {
    percent: 0,
  }

  actualize = (value) => {
    let percent = this.state.percent + Number((value).toFix(1));
    if (percent > 100) {
      percent = 100;
    }
    this.setState({ percent });
  }


  render() {
    return (
        <Row type="flex" style={{marginTop:40}}>
          <Col span={8}>
            <Agenda/>
          </Col>
          <Col span={16}>
            <Row>
              <Card/>
            </Row>
            <Row>
              <Progress className="Progress" percent={this.state.percent}/>
            </Row>
          </Col>
        </Row>
    );
  }
}

export default HomePage;