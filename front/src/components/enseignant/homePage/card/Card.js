import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import './Card.css';
import Duration from './Duration';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';

class Carte extends Component{
  render(){
    return(
      <Card title="Gestion des tâches du jour"
            style={{ width: '100%'}}>
        <Row type="flex" align="middle">
          <Col span={2}>
            <Button className="plus_button" shape="circle">
              <Icon type="plus" />
            </Button>
            </Col>
            <Col span={16}>
            {/*Insertion du nom des tâches dans les input*/}
            <TaskEdit/>
            <TaskEdit/>
            <TaskEdit/>
          </Col>
          {/*Increment pour la duree des tâches*/}
          <Col span={2} offset={4}>
            <Duration/>
          </Col>
        </Row>
        <Row>
          <TaskDisplay/>
        </Row>
      </Card>
    );
  }
}
export default Carte;