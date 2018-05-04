import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row,Col, Progress, Button, Popover} from 'antd';
import moment from 'moment'
import './HomePage.css';
import Agenda from './Agenda';
import Manage from './card/Manage';
import { postEvent, getEvents, modifyEvent } from '../../../appState/actions/event'

class HomePage extends Component{
  state = {
    progress: 0,//((this.props.advancement.map(adv => adv["sumduration"]))/(8*60)*100).toFixed(1),
    selectedDate: moment(),
  }


  componentWillReceiveProps(nextProps){
    if (this.props.events !== nextProps.events || nextProps.workdays !== this.props.workdays) 
      this.getProgressFromEvents(nextProps.events, nextProps.workdays);
  }

  handleDateSelected = selectedDate => {
    this.props.getEvents(selectedDate.toDate())
    this.setState({
      selectedDate,
    })
  }

  handleAddEvent = (partialEvent) => {
    this.props.postEvent({...partialEvent, date: this.state.selectedDate})
  }

  handleEditEvent = (event) => {
    this.props.modifyEvent(event)
  }

  postDiversEvent = () => {
    const diversTask = this.props.tasks.find(task => task.isDiverse)
    
    if (!diversTask) {
      // afficher un message d'erreur
      return
    }
    const diversProject = this.props.projects.find(project => project.id === diversTask.projectId)
    if (!diversProject) {
      console.log("coucou2")
      return
    }
    const diversActivity = this.props.activities.find(activity => activity.id === diversProject.activityId)
    if (!diversActivity)
    {
      console.log("coucou3")
      return
    }

    const duration = this.props.events.filter(event => moment(event.startDate).isSame(this.state.selectedDate, 'day')).reduce((acc, event) =>
    {
      return acc+event.duration
    }, 0)
    const currentDayOfWeek = parseInt(this.state.selectedDate.format('e'), 10)
    const workDay = this.props.workdays.find(item => item.id === currentDayOfWeek)

    this.props.postEvent({
      activity: diversActivity, 
      project: diversProject, 
      task: diversTask, 
      description: '', 
      duration: (workDay.duration*60)-duration, 
      date: this.state.selectedDate
    })
  }

  getProgressFromEvents = (events, workdays = this.props.workdays) => {
    const duration = events.filter(event => moment(event.startDate).isSame(this.state.selectedDate, 'day')).reduce((acc, event) =>
    {
      return acc+event.duration
    }, 0)
    const currentDayOfWeek = parseInt(this.state.selectedDate.format('e'), 10)
    const durationDay = workdays.find(item => item.id === currentDayOfWeek)
    const progress = Math.round((duration/(durationDay.duration*60))*100)
    const boundProgress = progress > 100 ? 100 : progress
    this.setState({
      //On a pas encore le workday de près et il faut récupérer le jour sélectionné et le comparer au jour actuel
      progress: boundProgress
    })
  }

  render() {
    return (
        <Row type="flex" style={{marginTop:10}}>
          <Col span={8}>
            <Agenda 
              onSelect={this.handleDateSelected}
              selectedDate={this.state.selectedDate}
            />
          </Col>
          <Col span={16}>
            <Row>
              <Manage
                onAddEvent={this.handleAddEvent}
                onEditEvent={this.handleEditEvent}
                selectedDate={this.state.selectedDate}
              />
            </Row>
            <Row style={{marginTop:"2rem"}}  type="flex" align="middle">
              <Col span={20}>
              <Progress 
                style={{width:"100%"}}
                percent={this.state.progress}/>
              </Col>
              <Col span={4}>
              <Popover content={<Button onClick={this.postDiversEvent} style={{width:"100%"}}>Oui</Button>} placement="topRight" trigger="click" title="Êtes-vous sûr de vouloir terminer la journée ?"> 
                <Button style={{width:"100%"}} type="danger" ghost>Remplir les trous ?</Button>
              </Popover>
              </Col>
            </Row>
          </Col>
        </Row>
    );
  }
}

const mapStateToProps = store => ({
  tasks: store.task.tasks,
  projects: store.project.projects, 
  activities: store.activity.activities,
  events: store.event.events,
  workdays: store.workday.workdays,
});

const mapDispatchToProps = dispatch => ({
  postEvent: postEvent(dispatch),
  getEvents: getEvents(dispatch), 
  modifyEvent: modifyEvent(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
