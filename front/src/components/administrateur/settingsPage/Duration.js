import React, { Component } from 'react';
import {Select, InputNumber} from 'antd';

import './Duration.css';

function handleChange(value) {
    console.log(`selected ${value}`);
}

function onChange(value) {
    console.log('changed', value);
}


class Day extends Component{

  render(){
    return(
        <div className="Duration">
            <h3>Temps total de travail : 39h</h3>
            <Select className="Day" style={{width:170}} placeholder="Sélectionnez un jour" onChange={handleChange}>
                <Select.Option value="lundi">Lundi</Select.Option>
                <Select.Option value="mardi">Mardi</Select.Option>
                <Select.Option value="mercredi">Mercredi</Select.Option>
                <Select.Option value="jeudi">Jeudi</Select.Option>
                <Select.Option value="vendredi">Vendredi</Select.Option>
            </Select>
            <InputNumber className="increment"
                defaultValue={8}
                min={3}
                max={10}
                step={1}
                formatter={value => `${value} H`}
                parser={value => value.replace('H', '')}
                onChange={onChange}
            />
        </div>
    );
  }
}
export default Day;
