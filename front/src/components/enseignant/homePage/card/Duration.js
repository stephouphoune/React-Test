import React, { Component } from 'react';
import {InputNumber, Button, Icon} from 'antd';
import './Duration.css';

class Duration extends Component{
  render(){
    return(
      <InputNumber 
         className="increment"
         size="large"
         value={this.props.duration}
         min={15}
         max={300}
         step={15}
         onChange={this.props.onChange}
         formatter={value => `${value}min`}
         parser={value => value.replace('min', '')}
      />
  );
  }
}
export default Duration;
