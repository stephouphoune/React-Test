import React from 'react'
import { DatePicker, Button, Icon } from 'antd';
import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const HomePage = (props) => (
    <div>
            <div className="Calendar">
              <DatePicker format={dateFormat}/>            
              <Button.Group classeName="SwitchDay">
                <Button size="small" type="default">
                  <Icon type="left" />Hier
                </Button>
                <Button size="small" type="default">
                  Demain<Icon type="right" />
                </Button>
              </Button.Group>
            </div>
    </div>
);

export default HomePage
