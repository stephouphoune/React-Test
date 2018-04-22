import React, { Component } from 'react';
import {Card, Row, Col, Icon, Button} from 'antd';
import './CardStatsPage.css';
import XYChart from './XYChart';
import PieChart from './PieChart';
import Select from './Select';
import DownloadButton from './DownloadButton';

class CarteStatsPage extends Component{
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
           bordered={true} 
           className='XYCard'>
        <XYChart/>
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
export default CarteStatsPage;
