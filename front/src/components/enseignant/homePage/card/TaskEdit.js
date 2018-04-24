import React, { Component } from 'react';
import {Input, Col, Select, InputNumber, Button, Icon, AutoComplete, Divider} from 'antd';
import './TaskEdit.css';

class TaskEdit extends Component{
    state = {
      inputValue: 1,
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
      dataSource={this.props.dataSource}
      placeholder={this.props.placeholder}
      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
    )
  }
}
export default TaskEdit;
