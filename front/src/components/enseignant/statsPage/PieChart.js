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

class PieChart extends Component{

  static defaultProps = {//proprietes par default du composant graphique
    displayTitle:'true',
    displayLegend: 'true',
    legendPosition : 'right'
  }

  getChartData = () => {
    console.log(this.props.choice)
    if (this.props.choice === 'project')
    {
      return {
        labels: this.props.statsProjects.map(stat => stat.projectName),
        datasets: [{
          backgroundColor: getRandomColors(this.props.statsProjects.length),
          data: this.props.statsProjects.map(stat => stat.duration)
        }]
      }
    }
    else if (this.props.choice === 'task')
    {
      return {
        labels: this.props.statsTasks.map(stat => stat.taskName),
        datasets: [{
          backgroundColor: getRandomColors(this.props.statsTasks.length),
          data: this.props.statsTasks.map(stat => stat.duration)
        }]
      }
    }
  }
  render() {
    if (this.getChartData().datasets[0].data.length === 0)
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

const getProperStatsTasks = store => {
  
  const { statsTasks } = store.statsTasks
    return statsTasks.map(stat => {
      console.log(stat)
      const task = store.task.tasks.find(task => task.id === stat.taskId)
      
      return {
        taskName: task ? task.name : 'tache inconnue',
        taskId: stat.taskId,
        duration: stat.duration, 
      }
    })
}

const getProperStatsProjects = store => {
  const { statsProjects } = store.statsProjects
    return statsProjects.map(stat => {
      console.log(stat)
      const project = store.project.projects.find(project => project.id === stat.projectId)
      
      return {
        projectName: project ? project.name : 'projet inconnu',
        projectId: stat.projectId,
        duration: stat.duration, 
      }
    })
}

const mapStateToProps = store => ({
  statsTasks: getProperStatsTasks(store),
  statsProjects: getProperStatsProjects(store)
})

export default connect(
  mapStateToProps
)(PieChart);
