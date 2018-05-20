import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Radio, Button, Icon, Popover } from 'antd';
import {CSVLink, CSVDownload} from 'react-csv';
import { getStatsCsv } from '../../../appState/actions/statsCsv'
import './DownloadButton.css';

class DownloadButton extends Component {
  onClick = () => {
    this.props.getStatsCsv()
  }
  
  render(){

    const data2 = [['Activité', 'Projet', 'Tâche', 'Temps']]
    data2.push(['activité1', 'projet1', 'tache1'])
    console.log(data2)
    const content = (
      <div className="ExportChoice">
        <Button className="PDFButton">.pdf</Button>
        <Button onClick={this.onClick} className="XLSButton"><CSVLink data={data2} separator={";"} filename="Analyse de temps.csv">.xls</CSVLink></Button>
      </div>
    );
    return(
      <Popover content={content} placement="topLeft" trigger="click" title="Exportation de l'analyse">
        <Button type="primary" icon="download" shape="circle" size={'large'} ></Button>
      </Popover>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getStatsCsv: getStatsCsv(dispatch),
})

export default connect(
  null,
  mapDispatchToProps
)(DownloadButton);
