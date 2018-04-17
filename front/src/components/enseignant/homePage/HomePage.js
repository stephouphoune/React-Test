import React, { Component } from 'react';
import {Row,Col} from 'antd';
import './HomePage.css';
import Agenda from './Agenda';
import Card from './card/Card';


class HomePage extends Component{

  render() {
    return (
        <Row className="HomePage">
          <Col span={8}>
            <Agenda/>
          </Col>
          <Col span={16}>
            <Card/>
          </Col>
        </Row>
    );
  }
}

export default HomePage;