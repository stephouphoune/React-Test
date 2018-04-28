import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, Row, Col, Icon, Button, Input} from 'antd';
import './Manage.css';
import Duration from './Duration';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';

class Manage extends Component{

  state = {
    selectedActivity: null,
    selectedProject: null,
    selectedTask: null,
    duration: 15, 
    description: ''
  }

  onChangeDuration = value => {
    this.setState({
      duration: value
    })
  }

  handleActivitySelect = selectedActivity => {
    console.log('activity', selectedActivity)
    this.setState({
      selectedActivity,
      selectedProject: null,
      selectedTask: null
    })
  }

  handleProjectSelect = selectedProject => {
    this.setState({
      selectedProject, 
      selectedTask: null
    })
  }

  handleTaskSelect = selectedTask => {
    this.setState({
      selectedTask
    })
  }

  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value
    })
  }

  getProjectsFromActivity = () => {
    return this.props.projects.filter(project =>
      project.activityId === this.state.selectedActivity.id
    )
  }

  getTasksFromProject = () => {
    return this.props.tasks.filter(task =>
      task.projectId === this.state.selectedProject.id
    )
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
              <TaskEdit
                data={this.props.activities}
                dataNameKey="name"
                placeholder="Activité"
                selectedData={this.state.selectedActivity}
                onSelect={this.handleActivitySelect}
              />
              {this.state.selectedActivity &&
                <TaskEdit
                  data={this.getProjectsFromActivity()}
                  dataNameKey="name"
                  placeholder="Projet"
                  selectedData={this.state.selectedProject}
                  onSelect={this.handleProjectSelect}
                />
              }
              {this.state.selectedProject &&
                <TaskEdit
                  data={this.getTasksFromProject()}
                  dataNameKey="name"
                  placeholder="Tâche"
                  selectedData={this.state.selectedTask}
                  onSelect={this.handleTaskSelect}
                />
              }
              
          </Col>          
          <Col span={3} offset={3}>
            <Duration
              onChange={this.onChangeDuration}
              duration={this.state.duration}
            />
          </Col>
        </Row>
        <Row>
        {this.state.selectedTask &&
          <Input 
            placeholder="Description" 
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
        }
        </Row>
        <Row>
          <TaskDisplay/>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = store => ({
  activities: store.activity.activities,
  projects: store.project.projects, 
  labels: store.label.labels,
  users: store.users.users,
  isAdmin: store.user.isAdmin,
  tasks: store.task.tasks
})

export default connect(
  mapStateToProps
)(Manage)