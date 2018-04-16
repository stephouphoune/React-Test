import React, { Component } from 'react';
import {Row,Col} from 'antd';
import './HomePage.css';
import Agenda from './Agenda';
import Card from './card/Card';


class HomePage extends Component{

  render() {
    return (
          <div>
            <Row>
              <Col span={6}>
                <Agenda/>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={16}>
                <Card/>
              </Col>
            </Row>
          </div>
    );
  }
}

export default HomePage;