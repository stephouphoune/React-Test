import React, { Component } from 'react';
import {Calendar, Button, Icon} from 'antd';
import './Agenda.css';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class Agenda extends Component{
  render(){
    return(
      <div className="flex-container">
        <Calendar  fullscreen={false} onPanelChange={onPanelChange}/>
        <Button
            className = "BoutonActualiser"
            type="primary"
            icon="sync"
        >Actualiser mon agenda
        </Button>
      </div>
    )
  }
}
export default Agenda;
