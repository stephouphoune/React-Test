import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Radio, Button, Icon, Popover } from 'antd';
import {CSVLink, CSVDownload} from 'react-csv';
import { getStatsCsv } from '../../../appState/actions/statsCsv'
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

    const data = [['Activité', 'Projet', 'Tâche', 'Durée (heures)']]
    for (let i=0;i<this.props.statsCsv.length;i++)
    {
      data.push(this.props.statsCsv[i])
    }
    
    return(
      <CSVLink data={data} separator={";"} filename="Analyse de temps.csv"><Button className="XLSButton" icon="download" type="primary" shape="circle" size={'large'}></Button></CSVLink>
    )
  }
}

const mapStateToProps = store => ({
  statsCsv: store.statsCsv.statsCsv,
  events: store.event.events
})

const mapDispatchToProps = dispatch => ({
  getStatsCsv: getStatsCsv(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadButton);
