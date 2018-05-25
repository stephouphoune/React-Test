import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import { connect } from 'react-redux'
import './StatsPage.css';
import AeraChart from './AeraChart';
import PieChart from './PieChart';
import Select from './Select';
import { getStatsActivities } from '../../../appState/actions/statsActivities'
import { getStatsCsv } from '../../../appState/actions/statsCsv'
import DownloadButton from './DownloadButton';
import moment from 'moment'


class StatsPage extends Component{

  componentWillReceiveProps = (nextProps) => {
    if (this.props.events != nextProps.events)
    {  
      nextProps.getStatsActivities()
    }
  }

  state = {
    isLoaded:false,
    choice:null
  }

  isLoaded = (isLoaded) =>
  {
    this.setState({isLoaded})
  }

  choice = (choice) => {
    this.setState({
      choice
    })
  }

  render(){
    return(
        <div>
          
          <div className='FirstNameLastName'>
            {'Connecté en tant que : '+this.props.user.firstName+' '+this.props.user.lastName}
          </div>
          <Row className='RowCardChart' style={{marginTop:10}}>
            <Col span={12} className='PieColumn'>
              <Card title={this.state.choice ? 'Comparaison entre les '+this.state.choice+' en heures' : ''}
                    bordered={true}
                    style={{ width:'100%' }}
                    >
                  <div className="CardLeft">
                    {/*Ici on vérifie que le camembert est bien lancé. Si ce n'est pas le cas on met un smiley*/}
                    {this.state.isLoaded ? <PieChart choice={this.state.choice} className="Pie"/> : <h1>Pour lancer l'analyse du diagramme circulaire, <br/> faites un choix d'activité ou de projet</h1>}
                  </div>
              </Card>
            </Col>
            <Col span={12} className='XYColumn'>
            <Card title="Évolution du temps passé par Activité en heures"
                  className='XYCard'>
                <AeraChart/>
                
              </Card>
            </Col>
          </Row>
          <Row className='RowCardSelect'>
            <Select choice={this.choice} isLoaded={this.isLoaded}/>
          </Row>
          <Row className='BoutonDownload'>
            <DownloadButton/>
          </Row>
        </div>
    );
  }
}

const mapStateToProps = store => ({
  events: store.event.events,
  user: store.user
})

const mapDispatchToProps = dispatch => ({
  getStatsActivities: getStatsActivities(dispatch),
  getStatsCsv: getStatsCsv(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);
