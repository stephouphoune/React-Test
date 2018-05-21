import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import { connect } from 'react-redux'
import './StatsPage.css';
import AeraChart from './AeraChart';
import PieChart from './PieChart';
import Select from './Select';
import { getStatsActivities } from '../../../appState/actions/statsActivities'
import DownloadButton from './DownloadButton';

class StatsPage extends Component{

  componentDidMount = () => {
    this.props.getStatsActivities()
  }

  state = {
    isLoaded:false
  }

  isLoaded = (isLoaded) =>
  {
    this.setState({isLoaded})
  }

  render(){
    return(
        <div>
          <Row className='RowCardChart'>
            <Col span={12} className='PieColumn'>
              <Card title="Comparaison entre les Tâches (minutes)" 
                    bordered={true}
                    style={{ width:'100%' }}
                    >
                  <div className="CardLeft">
                    {/*Ici on vérifie que le camembert est bien lancé. Si ce n'est pas le cas on met un smiley*/}
                    {this.state.isLoaded ? <PieChart className="Pie"/> : <h1>Sélectionnez une activité et un projet</h1>}
                  </div>
              </Card>
            </Col>
            <Col span={12} className='XYColumn'>
            <Card title="Évolution du temps passé par Activité (minutes)"
                  className='XYCard'>
                <AeraChart/>
              </Card>
            </Col>
          </Row>
          <Row className='RowCardSelect'>
            <Select isLoaded={this.isLoaded}/>
          </Row>
          <Row className='BoutonDownload'>
            <DownloadButton/>
          </Row>
        </div>
    );
  }
}

const mapStateToProps = store => ({
  statsActivities: store.statsActivities.statsActivities,
  events: store.event.events
})

const mapDispatchToProps = dispatch => ({
  getStatsActivities: getStatsActivities(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsPage);
