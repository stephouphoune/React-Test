import React, { Component } from 'react';
import {Line, Bar, Pie} from 'react-chartjs-2';

//inserer des donnees a traiter

//*****************************
class XYChart extends Component{
  state = {
      chartData:{
        labels: ['Enseignement', 'Administration', 'Recherche'],
        datasets:[{
            label:"Analyse des activités",
            data:[
              617594,
              181045,
              243060,
            ],
            backgroundColor:[
              'rgba(255, 99, 0, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
            ]
        }]
      }
  }
  static defaultProps = {//proprietes par default du composant graphique
    displayTitle:'true',
    displayLegend: 'true',
    legendPosition : 'left'
  }
  render() {
    return (
      <Bar
      data={this.state.chartData}
      />
    );
  }
}

export default XYChart;
