import React, { Component } from 'react';
import {Calendar, DatePicker, Button, Icon, Row, Col} from 'antd';
import './Agenda.css';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

class Agenda extends Component{
  render(){
    return(
      <div className="flex-container">
        <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
        <Button.Group>
            <Button>
                <Icon type="left"/>Hier
            </Button>
            <Button>
                Demain<Icon type="right"/>
            </Button>
        </Button.Group>
        <Button
            className = "BoutonActualiser"
            size="small"
            type="default"
        >
            <Icon>Actualiser mon agenda</Icon>
        </Button>
      </div>
    )
  }
}
export default Agenda;
