import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import './Card.css';
import Duration from './Duration';
import ProgressBar from './ProgressBar';
import TasksEdit from './TasksEdit';
import TasksDisplay from './TasksDisplay';
import Duration_list from './Duration_list';


class Carte extends Component{
  render(){
    return(
      <div>
      <Card className="card_elements"
            title="Gestion des tâches du jour"
            style={{ width: '100%' }}
            actions={[<ProgressBar className="Progressing_time" />]}>
      <Row className="flex-container2">
        <Button className="plus_button" shape="circle">
          <Icon type="plus" />
        </Button>
        <TasksEdit/>
        <Duration/>
     </Row>
     <Row>
      <TasksDisplay/>
      <Duration_list/>
     </Row>

   </Card>
      </div>
    );
  }
}
export default Carte;
