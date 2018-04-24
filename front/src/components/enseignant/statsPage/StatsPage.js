import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import './StatsPage.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Select from './Select';
import DownloadButton from './DownloadButton';

class StatsPage extends Component{
  render(){
    return(
        <div>
          <Row className='RowCardChart'>
            <Col span={12} className='PieColumn'>
            <Card title="Comparaison entre les activités" bordered={true}
                  style={{ width:'100%' }}>
                <PieChart/>
              </Card>
            </Col>
            <Col span={12} className='XYColumn'>
            <Card title="Évolution du temps passé par Activité"
                  className='XYCard'>
                <BarChart/>
              </Card>
            </Col>
          </Row>
          <Row className='RowCardSelect'>
            <Select/>
          </Row>
          <Row className='BoutonDownload'>
            <DownloadButton/>
          </Row>
        </div>
    );
  }
}

export default StatsPage
