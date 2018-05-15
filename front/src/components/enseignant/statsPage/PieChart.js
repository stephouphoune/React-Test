import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Pie } from 'react-chartjs-2';
//inserer des donnees a traiter

//*****************************

function rainbow(numOfSteps, step) {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
  }
  var c = "#" + ("44" + (~ ~(r * 255)).toString(16)).slice(-2) + ("44" + (~ ~(g * 255)).toString(16)).slice(-2) + ("44" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

function getRandomColors(count) {
  const colors = []
  for (let i=0;i<count;i++)
    colors.push(rainbow(count, i))
    
  return colors;
}

/*function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const getRandomColor = rotation => {
  console.log('color', rotation)
  let red = 0
  let green = 0
  let blue = 0
  const redRotation = rotation + Math.PI / 3
  const greenRotation = rotation + 2 * Math.PI / 3
  const blueRotation = rotation + 4 * Math.PI / 3
  red = redRotation < 2 * (Math.PI / 3)
    ? 127 + ((redRotation - (Math.PI / 3)) / (Math.PI / 3)) * 127
    : 0
  green = greenRotation < 4 * (Math.PI / 3)
    ? 127 + ((redRotation - 5 * Math.PI / 3) / (Math.PI / 3)) * 127
    : 0
  blue = blueRotation < 2 * Math.PI
    ? 127 + ((blueRotation - 7 * Math.PI / 3) / (Math.PI / 3)) * 127
    : 0
  
  return rgbToHex(red, green, blue)
}

const getRandomColors = count => {
  let rotation = 0
  const colors = []
  for (let i=0; i<count; i++) {
    colors.push(getRandomColor(rotation))
    rotation = rotation + (2 * Math.PI / 3) + (Math.PI / 3) * Math.random()
    if (rotation >= 2 * Math.PI) {
      rotation = rotation - 2 * Math.PI
    }
  }
  console.log('colors', colors)
  return colors
}
*/
class PieChart extends Component{

  static defaultProps = {//proprietes par default du composant graphique
    displayTitle:'true',
    displayLegend: 'true',
    legendPosition : 'right'
  }


  getChartData = () => {
    return {
      labels: this.props.stats.map(stat => stat.taskName),
      datasets: [{
        backgroundColor: getRandomColors(this.props.stats.length),
        data: this.props.stats.map(stat => stat.duration)
      }]
    }
  }
  render() {
    if (this.props.stats.length === 0)
    {
      return <h1>Aucune tâche à analyser...</h1>
    }
    else
    {
    return (
      <Pie
      data={this.getChartData()}
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
}

const getProperStats = store => {
  const { stats } = store.stats
  
    return stats.map(stat => {
      const task = store.task.tasks.find(task => task.id === stat.taskId)

      return {
        taskName: task ? task.name : 'tache inconnue',
        taskId: stat.taskId,
        duration: stat.duration, 
      }
    })
}

const mapStateToProps = store => ({
  stats: getProperStats(store)
})

export default connect(
  mapStateToProps
)(PieChart);
