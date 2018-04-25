import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import './Card.css';
import Duration from './Duration';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';
import { showActivity } from '../../../../appState/actions/activity'

const dataSource = {
  activite:['Enseigment', 'Administration', 'Recherche'],
  projet:['Cours', 'TP', 'TD'], 
  tache:['Traitement du signal', 'Programmation système']
}


class Carte extends Component{

  state = {
      activity_id: '',
      name: ''
  }



  render(){
    const { activity_id, name } = this.state
    return(
      <Card title="Gestion des tâches du jour"
            style={{ width: '100%'}}>
        <Row type="flex" align="middle" style={{marginBottom:15}}>
          <Col span={2}>
            <Button className="plus_button" shape="circle">
              <Icon type="plus" />
            </Button>
            </Col>
            <Col span={16}>
            {/*Insertion du nom des tâches dans les input*/}
            <TaskEdit dataSource={dataSource.activite}/>
            <TaskEdit dataSource={dataSource.projet}/>
            <TaskEdit dataSource={dataSource.tache}/>
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