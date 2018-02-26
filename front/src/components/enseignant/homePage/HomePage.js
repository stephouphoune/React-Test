import React from 'react'
import { DatePicker, Button, Icon } from 'antd';
import moment from 'moment';

import './HomePage.css';

const dateFormat = 'YYYY/MM/DD';

const HomePage = (props) => (
  <div>
    
    <div className="Calendar">
      <DatePicker format={dateFormat}/>            
      <Button.Group className="ButtonGroup">
        <Button
          className = "Button"
          size="small"
          type="default"
        >
          <Icon type="left" />Hier
        </Button>
        <Button
          className="Button"
          size="small"
          type="default"
        >
          Demain<Icon type="right" />
        </Button>
      </Button.Group>
    </div>
  </div>
);

export default HomePage