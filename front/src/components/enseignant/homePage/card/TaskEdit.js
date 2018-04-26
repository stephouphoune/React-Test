import React, { Component } from 'react';
import {Input, Col, Select, InputNumber, Button, Icon, AutoComplete, Divider} from 'antd';
import './TaskEdit.css';

class TaskEdit extends Component{


  render(){
    return(
      <AutoComplete
      style={{ width: "auto", marginRight:5}}
      size="large"
      dataSource={this.props.dataSource}
      placeholder={this.props.placeholder}
    />
    )
  }
}
export default TaskEdit;
