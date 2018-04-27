import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Row, Col, Icon, Button} from 'antd';
import './Manage.css';
import Duration from './Duration';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';

const dataSource = {
  activite:['Enseigment', 'Administration', 'Recherche'],
  projet:['Cours', 'TP', 'TD'], 
  tache:['Traitement du signal', 'Programmation système']
}


class Manage extends Component{

  state = {
      
  }

  render(){


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
            {console.log(this.props.projects)}
            {console.log(this.props.activities)}
            {console.log(this.props.labels)}
              {console.log(this.props.isAdmin)}
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

const mapStateToProps = store => ({
  activities:store.activity.activities,
  projects:store.project.projects, 
  labels:store.label.labels,
  users:store.users.users,
  isAdmin: store.user.isAdmin,
})

export default connect(
  mapStateToProps
)(Manage)