import React, { Component } from 'react';
import {Calendar, Button, Icon} from 'antd';
import './Agenda.css';


class Agenda extends Component{
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
            type="primary"
            icon="sync"
        >Actualiser mon agenda
        </Button>
      </div>
    )
  }
}
export default Agenda;
