import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import {Card, Row, Col, Icon, Button, Input, message} from 'antd';
import './Manage.css';
import Duration from './Duration';
import TaskEdit from './TaskEdit';
import TaskDisplay from './TaskDisplay';
import { isMoment } from 'moment';

class Manage extends Component{

  state = {
    selectedActivity: null,
    selectedProject: null,
    selectedTask: null,
    duration: 15, 
    description: '',
    isModifying: false,
    modifyingEvent: null,
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.selectedDate !== nextProps.selectedDate && this.state.isModifying) {
      this.resetState()
    }
  }

  onChangeDuration = value => {
    this.setState({
      duration: value
    })
  }

  handleActivitySelect = selectedActivity => {
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

  handleModifyingEvent = event => {
    const task = this.props.tasks.find(item => item.id === event.taskId)
    const project = this.props.projects.find(item => item.id === task.projectId)
    const activity = this.props.activities.find(item => item.id === project.activityId)
    this.setState({
      selectedActivity: activity,
      selectedProject: project,
      selectedTask: task,
      duration: event.duration,
      description: event.description, 
      isModifying: task && project && activity ? true : false,
      modifyingEvent: event
    })
  }
  

  handleAddEvent = () => {
    if (this.state.isModifying && this.state.selectedActivity && this.state.selectedProject && this.state.selectedTask) 
    {
      this.props.onEditEvent({
        oldEvent: this.state.modifyingEvent,
        activity: this.state.selectedActivity,
        project: this.state.selectedProject,
        task: this.state.selectedTask,
        duration: this.state.duration,
        description: this.state.description,
      })
    } 
    else if (this.state.selectedActivity && this.state.selectedProject && this.state.selectedTask){  
      this.props.onAddEvent({
        activity: this.state.selectedActivity,
        project: this.state.selectedProject,
        task: this.state.selectedTask,
        duration: this.state.duration,
        description: this.state.description,
      })
      return
    }
    else if (!this.state.selectedActivity){
      message.warning('Sélectionnez une activité disponible avant de pouvoir ajouter un évènement', 3)
    }
    else if (!this.state.selectedProject){
      message.warning('Sélectionnez un projet disponible avant de pouvoir ajouter un évènement', 3)
    }
    else if (!this.state.selectedTask){
      message.warning('Sélectionnez une tâche disponible avant de pouvoir ajouter un évènement', 3)
    }
    this.resetState()
  }

  resetState = () => {
    this.setState({
      selectedActivity: null,
      selectedProject: null,
      selectedTask: null,
      isModifying: false,
      description: '',
      duration: 15
    })
  }

  getActivities = () => {
    return this.props.activities.filter(activity => activity.isVisible === 1)
  }

  getProjectsFromActivity = () => {
    return this.props.projects.filter(project =>
      project.activityId === this.state.selectedActivity.id && project.isVisible === 1)
  }

  getTasksFromProject = () => {
    return this.props.tasks.filter(task =>
      task.projectId === this.state.selectedProject.id && task.isVisible === 1)
  }


  render(){
    return(
      <Card title="Gestion des tâches du jour"
            className="CardGestion">
        <Row type="flex" align="middle" style={{marginBottom:15}}>
          <Col span={2}>
            <Button 
                className="plus_button" 
                shape="circle"
                onClick={this.handleAddEvent}
            >
              <Icon type="plus" />
            </Button>
          </Col>
          <Col span={16}>
              <TaskEdit
                data={this.getActivities()}
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
          {this.state.isModifying &&
            <Button
              type="dashed"
              onClick={this.resetState}
            >
              Annuler la modification
            </Button>
          }
        </Row>
        <Row>
          <TaskDisplay
            requestModifying={this.handleModifyingEvent}
            selectedDate={this.props.selectedDate}
          />
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
  tasks: store.task.tasks, 
  events: store.event.events
})

export default connect(
  mapStateToProps
)(Manage)