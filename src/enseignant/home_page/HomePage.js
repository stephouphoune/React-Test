import React from 'react'
import { DatePicker, Button, Icon } from 'antd';
import moment from 'moment';

import './HomePage.css';

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const styles = {
  buttonGroup: {
    display: 'flex'
  },
  button: {
    width: '100%'
  }
}

const HomePage = (props) => (
  <div>
    <div className="Calendar">
      <DatePicker format={dateFormat}/>            
      <Button.Group style={styles.buttonGroup}>
        <Button
          size="small"
          type="default"
          style={styles.button}
        >
          <Icon type="left" />Hier
        </Button>
        <Button
          size="small"
          type="default"
          style={styles.button}
        >
          Demain<Icon type="right" />
        </Button>
      </Button.Group>
    </div>
  </div>
);

export default HomePage
