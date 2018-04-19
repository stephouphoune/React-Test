import React, { Component } from 'react';
import {InputNumber, Button, Icon} from 'antd';
import './Duration.css';

function onChange(value) {
  console.log('changed', value);
}

class Duration extends Component{
  render(){
    return(
      <InputNumber 
         className="increment"
         size="large"
         defaultValue={15}
         min={0}
         max={120}
         step={15}
         formatter={value => `${value} min`}
         parser={value => value.replace('min', '')}
         onChange={onChange}
      />
  );
  }
}
export default Duration;
