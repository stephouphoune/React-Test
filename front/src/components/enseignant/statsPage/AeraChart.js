import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
//inserer des donnees a traiter

const data = [
      {name: 'Janvier', Enseignement: 60, Administration: 25, Recherche: 30},
      {name: 'Février', Enseignement: 80, Administration: 27, Recherche: 22},
      {name: 'Mars', Enseignement: 40, Administration: 35, Recherche: 10},
      {name: 'Avril', Enseignement: 20, Administration: 20, Recherche: 50},
];
//*****************************
class AeraChart extends Component{
  
  render() {
    return (
      <AreaChart width={700} height={350} data={data}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Area type='monotone' dataKey='Enseignement' stackId="1" stroke='#8884d8' fill='#8884d8' />
        <Area type='monotone' dataKey='Administration' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
        <Area type='monotone' dataKey='Recherche' stackId="1" stroke='#ffc658' fill='#ffc658' />
      </AreaChart>
    );
  }
}

export default AeraChart;
