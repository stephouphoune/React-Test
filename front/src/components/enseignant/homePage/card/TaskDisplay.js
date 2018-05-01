import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, message, Avatar, Spin, Icon, Popconfirm } from 'antd';
import { deleteEvent } from '../../../../appState/actions/event'
import { getAdvancement } from '../../../../appState/actions/advancement'
import './TaskDisplay.css';
import 'moment/locale/fr.js';
import moment from 'moment'

//differentes taches presentes dans la liste et modifiables
class TaskDisplay extends Component{
  state = {
    loading: true,
    loadingMore: false,
    data: [],
  }

  getCurrentEvents = () => 
    this.props.events.filter(event => moment(event.startDate).isSame(this.props.selectedDate, 'day'))

  
  confirmDeletion = (eventId, eventName) => () => {
    message.success(`"${eventName}" a bien été supprimé !`);
    this.props.deleteEvent(eventId)
    this.props.getAdvancement(this.props.selectedDate)
  }

  render() {


    return(
      <List
        className="TaskList"
        itemLayout="horizontal"
        dataSource={this.getCurrentEvents()}
        renderItem={event => {
          const startDate = moment(event.startDate)
          const endDate = moment(event.endDate)
          return (
            <List.Item
              key={event.id}
              actions={[
                <a onClick={() => this.props.requestModifying(event)} href="#">Modifier</a>,
                
                <Popconfirm 
                placement="topRight"
                title="Êtes vous sûr de vouloir supprimer cet évènement" 
                onConfirm={this.confirmDeletion(event.id, event.name)}
                okText="Oui" 
                cancelText="Non"
              >
                <a href="#" style={{color:"red"}}>Supprimer</a>
              </Popconfirm>,
              ]}
            >
                Durée : {event.duration} minutes
                <List.Item.Meta
                  title={event.name}
                  description={event.description}
                />
            </List.Item>
          )
        }
      }/>
    );
  }
}

const mapStateToProps = store => ({
  events: store.event.events,
});

const mapDispatchToProps = dispatch => ({
  deleteEvent: deleteEvent(dispatch),
  getAdvancement: getAdvancement(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDisplay);
