import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Radio, Button, Icon, Popover } from 'antd';
import {CSVLink, CSVDownload} from 'react-csv';
import moment from 'moment'
import './DownloadButton.css';

class DownloadButton extends Component {
  
  state = ({
    visible:false
  })

  onClickCsv = () => {
    this.setState({
      visible:false
    })
  }

  onClickDownload = () => {
    this.setState({
      visible:true
    })
  }

  render(){

    const data = [['Mois', 'Année', 'Activité', 'Durée (heures)']]
    const activityDuration = this.props.statsActivities.sort()
    for (let i=0;i<this.props.statsActivities.length;i++)
    {
      data.push([moment(this.props.statsActivities[i].month, 'M').format('MMMM'), this.props.statsActivities[i].year, this.props.statsActivities[i].name, (this.props.statsActivities[i].duration/60).toString().replace(/[.]/, ",")])
    }
    
    return(
      <CSVLink data={data} separator={";"} filename="Analyse de temps.csv"><Button className="XLSButton" icon="download" type="primary" shape="circle" size={'large'}></Button></CSVLink>
    )
  }
}

const mapStateToProps = store => ({
  statsActivities: store.statsActivities.statsActivities,
  events: store.event.events
})

export default connect(
  mapStateToProps,
)(DownloadButton);
