import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

//inserer des donnees a traiter
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


const options  = {
    scales: {
        yAxes: [{
            stacked: true
        }]
    },
    animation: {
      duration: 750,
    },
}


//*****************************
class AeraChart extends Component{
  
  getChartData = () => {
    return {
      labels: this.props.statsActivities.map(activity => activity.month),
      datasets: this.props.statsActivities.map(activity => 
        [{
          label: activity.activityName,
          backgroundColor: getRandomColors(),
          data: activity.duration,
        }]
      )
    }
  }

  render() {
    return (
      <Line 
          options={options}
          data={this.getChartData()}
      />
    );
  }
}


const getProperStats = store => {
  const { statsActivities } = store.statsActivities
    return statsActivities.map(stat => {
      const activity = store.activity.activities.find(activity => activity.id === stat.activityId)

      return {
        activityName: activity ? activity.name : 'tache inconnue',
        activityId: stat.activityId,
        duration: stat.duration, 
        month: moment.months(stat.month-1)
      }
    })
}



const mapStateToProps = store => ({
  statsActivities: getProperStats(store)
})

export default connect(
  mapStateToProps
)(AeraChart);
