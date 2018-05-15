import React, { Component } from 'react';
import { Line } from 'react-chartjs-2'
//inserer des donnees a traiter
const colors = {
  green: {
    fill: '#e0eadf',
    stroke: '#5eb84d',
  },
  lightBlue: {
    stroke: '#6fccdd',
  },
  darkBlue: {
    fill: '#92bed2',
    stroke: '#3282bf',
  },
  purple: {
    fill: '#8fa8c8',
    stroke: '#75539e',
  },
};

const loggedIn = [26, 36, 42, 38, 40, 30, 12];
const available = [34, 44, 33, 24, 25, 28, 25];
const availableForExisting = [16, 13, 25, 33, 40, 33, 45];
const unavailable = [5, 9, 10, 9, 18, 19, 20];
const xData = [13, 14, 15, 16, 17, 18, 19];


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: "Unavailable",
    fill: true,
    backgroundColor: colors.purple.fill,
    pointBackgroundColor: colors.purple.stroke,
    borderColor: colors.purple.stroke,
    pointHighlightStroke: colors.purple.stroke,
    borderCapStyle: 'butt',
    data: unavailable,

  }, {
    label: "Available for Existing",
    fill: true,
    backgroundColor: colors.darkBlue.fill,
    pointBackgroundColor: colors.darkBlue.stroke,
    borderColor: colors.darkBlue.stroke,
    pointHighlightStroke: colors.darkBlue.stroke,
    borderCapStyle: 'butt',
    data: availableForExisting,
  }, {
    label: "Available",
    fill: true,
    backgroundColor: colors.green.fill,
    pointBackgroundColor: colors.lightBlue.stroke,
    borderColor: colors.lightBlue.stroke,
    pointHighlightStroke: colors.lightBlue.stroke,
    borderCapStyle: 'butt',
    data: available,
  }, {
    label: "Logged In",
    fill: true,
    backgroundColor: colors.green.fill,
    pointBackgroundColor: colors.green.stroke,
    borderColor: colors.green.stroke,
    pointHighlightStroke: colors.green.stroke,
    data: loggedIn,
  }]
};
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
  
  render() {
    return (
      <Line data={data}
          options={options}
      />
    );
  }
}

export default AeraChart;
