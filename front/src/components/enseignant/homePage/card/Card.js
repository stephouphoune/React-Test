import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import './Card.css';
import Duration from './Duration';
import ProgressBar from './ProgressBar';
import TasksEdit from './TasksEdit';
import TasksDisplay from './TasksDisplay';


class Carte extends Component{
  render(){
    return(
      <Card title="Gestion des tâches du jour"
            style={{ width: '100%' }}
            actions={[<ProgressBar/>]}>
        <Row className="Top_Gestion">
          <Button className="plus_button" shape="circle">
            <Icon type="plus" />
          </Button>
          {/*Insertion du nom des tâches dans les input*/}
          <TasksEdit/>
          {/*Increment pour la duree des tâches*/}
          <Duration/>
        </Row>
        <Row>
          <TasksDisplay/>
        </Row>
      </Card>
    );
  }
}
export default Carte;
