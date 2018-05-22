import React, { Component } from 'react';
import {Calendar, Button, Icon} from 'antd';
import { connect } from 'react-redux'
import { getSyncEvents } from '../../../appState/actions/event'
import './Agenda.css';


class Agenda extends Component{

  onClick = () => {
    this.props.getSyncEvents()
  }

  render(){
    return(
      <div className="Agenda">
        <div className="flex-container">
          <Calendar
            defaultValue={this.props.selectedDate}
            fullscreen={false}
            onSelect={this.props.onSelect}
          />
        </div>
      
        <Button
            className="BoutonActualiser"
            onClick={this.onClick}
            type="primary"
            icon="sync"
        >Actualiser mon agenda
        </Button>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  url: store.user.url,
})

const mapDispatchToProps = dispatch => ({
  getSyncEvents: getSyncEvents(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Agenda);
