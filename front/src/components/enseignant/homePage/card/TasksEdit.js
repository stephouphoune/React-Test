import React, { Component } from 'react';
import {Input, Col, Select, InputNumber, Button, Icon, AutoComplete} from 'antd';
import './TasksEdit.css';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];//mot clés pour les taches
//ANTD - - raccourcis boutons
const InputGroup = Input.Group;//pour la saisie de l'arboresscence de la tache
const Option = Select.Option;

function Complete() {
  return (
    <AutoComplete
      style={{ width: '100%' }}
      dataSource={dataSource}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  );
}

class TasksEdit extends Component{
    state = {
      inputValue: 1,
      dataSource:[],
    }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }

  render(){
    return(
      <InputGroup compact className="saisie_tache_auto">
            <Complete/>
            <Complete/>
            <Complete/>
       </InputGroup>
    )
  }
}
export default TasksEdit;
