import React, { Component } from 'react';
import {Line, Bar, Pie} from 'react-chartjs-2';

//inserer des donnees a traiter

//*****************************
class PieChart extends Component{
    state = {
      charData:{//on stocke les data dans un objet pour mettre a jour le graph a chaque changement du state
        labels: ["Cours", "TD", "TP"],
        datasets: [{
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
          data: [60,25,10]
        }]
      }
    }
  static defaultProps = {//proprietes par default du composant graphique
    displayTitle:'true',
    displayLegend: 'true',
    legendPosition : 'right'
  }
  render() {
    return (
      <Pie
      data={ this.state.charData }
      options={{
        title:{
          display:this.props.displayTitle,//on recupere la valeur du status de la propriete
        },
        legend:{
          display:this.props.displayLegend,
          position:this.props.legendPosition
        }
      }}
      />
    );
  }
}

export default PieChart;
