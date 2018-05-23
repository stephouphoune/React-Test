import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Radio, Button, Icon, Popover } from 'antd';
import {CSVLink, CSVDownload} from 'react-csv';
import { getStatsCsv } from '../../../appState/actions/statsCsv'
import './DownloadButton.css';

class DownloadButton extends Component {
  

  render(){

    const data = [['Activité', 'Projet', 'Tâche', 'Durée (heures)']]
    for (let i=0;i<this.props.statsCsv.length;i++)
    {
      data.push(this.props.statsCsv[i])
    }
    const content = (
      <div className="ExportChoice">
        <Button className="PDFButton">.pdf</Button>
        <Button onClick={this.onClickXls} className="XLSButton"><CSVLink data={data} separator={";"} filename="Analyse de temps.csv">.xls</CSVLink></Button>
      </div>
    );
    return(
      <Popover content={content} placement="topLeft" trigger="click" title="Exportation de l'analyse">
        <Button type="primary" icon="download" shape="circle" size={'large'} ></Button>
      </Popover>
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
