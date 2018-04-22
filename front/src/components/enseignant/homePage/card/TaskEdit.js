import React, { Component } from 'react';
import {Input, Col, Select, InputNumber, Button, Icon, AutoComplete, Divider} from 'antd';
import './TaskEdit.css';

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];//mot clés pour les taches
//ANTD - - raccourcis boutons

class TaskEdit extends Component{
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
      <AutoComplete
      style={{ width: "auto", marginRight:5}}
      size="large"
      dataSource={dataSource}
      placeholder={this.props.placeholder}
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
    )
  }
}
export default TaskEdit;
