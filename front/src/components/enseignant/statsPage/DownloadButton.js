import React, { Component } from 'react';
import { Radio, Button, Icon, Popover } from 'antd';
import './DownloadButton.css';

class DownloadButton extends Component {
  render(){
    const content = (
      <div className="ExportChoice">
        <Button className="PDFButton">.pdf</Button>
        <Button className="XLSButton">.xls</Button>
      </div>
    );
    return(
      <Popover content={content} placement="topLeft" trigger="click" title="Exportation de l'analyse">
        <Button type="primary" icon="download" shape="circle" size={'large'} ></Button>
      </Popover>
    )
  }

}
export default DownloadButton;
