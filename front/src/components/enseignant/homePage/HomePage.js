import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Row,Col, Progress, Button, Popover, Icon, notification} from 'antd';
import moment from 'moment'
import './HomePage.css';
import Agenda from './Agenda';
import Manage from './card/Manage';
import { postEvent, getEvents, modifyEvent } from '../../../appState/actions/event'

class HomePage extends Component{
  state = {
    progress: 0,
    selectedDate: moment(),
  }

  componentDidMount(){
    this.props.getEvents(this.state.selectedDate.toDate())
  }

  componentWillReceiveProps(nextProps){
    if (this.props.events !== nextProps.events || nextProps.workdays !== this.props.workdays) 
      this.getProgressFromEvents(nextProps.events, nextProps.workdays);
  }

  openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="danger" size="small" onClick={() => notification.close(key)}>
        Fermer
      </Button>
    );
    notification.config({
      placement: "bottomRight",
    });
    notification.open({
      style: {
        textAlign: "justify"
      },
      duration: 0,
      message: 'Task-Eat',
      description: 'Task-Eat est une application web de gestion d\'activités enseignantes développé dans le cadre d\'un projet de fin d\'année de Master 1 au sein de l\'école d`\'ingénieur ISEN Brest par deux étudiants de Master 1 : Stéphane Perreaux et Thomas Orvain. Leur encadrant de projet, Pierre-Jean Bouvet, enseignant chercheur, utilisait un logiciel de gestion de tâches (Laboxy) depuis quelque temps mais n\'en était pas totalement satisfait. L\'encadrant proposa donc aux étudiants de réaliser un logiciel possédant de nouvelles fonctionnalités permettant de faire gagner du temps aux utilisateurs. Le site se devait d\'être ergonomique et d\'intégrer une fonction d\'analyse d\'agenda.',
      key,
      btn
    });
  };

  handleDateSelected = selectedDate => {
    this.setState({
      selectedDate,
      progress:0
    })
    this.props.getEvents(selectedDate.toDate())
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
      console.log('Pas de tache divers')
      return
    }
    const diversProject = this.props.projects.find(project => project.id === diversTask.projectId)
    if (!diversProject) {
      console.log('Pas de projet Divers')
      return
    }
    const diversActivity = this.props.activities.find(activity => activity.id === diversProject.activityId)
    if (!diversActivity)
    {
      console.log('Pas d\'activité Divers')
      return
    }

    const duration = this.props.events.filter(event => moment(event.startDate).isSame(this.state.selectedDate, 'day')).reduce((acc, event) =>
    {
      return acc+event.duration
    }, 0)
    const currentDayOfWeek = parseInt(this.state.selectedDate.format('e'), 10)
    const workDay = this.props.workdays.find(item => item.id === currentDayOfWeek)
    
    if (this.state.progress !== 100)
    {
      this.props.postEvent({
        activity: diversActivity, 
        project: diversProject, 
        task: diversTask, 
        description: '', 
        duration: (workDay.duration*60)-duration, 
        date: this.state.selectedDate
      })
    }
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
            <Row style={{marginTop:"2rem", marginBottom:"2rem"}}  type="flex" align="middle">
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
            <Row>
              <Col span={1} offset={23}>
                <Button onClick={this.openNotification} type="primary" shape="circle">
                  <Icon type="question" />
                </Button>
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
