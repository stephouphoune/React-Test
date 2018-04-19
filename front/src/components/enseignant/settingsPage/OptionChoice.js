import React, { Component } from 'react';
import { Button, Radio, Input} from 'antd';
import './OptionChoice.css';


class OptionChoice extends Component{
  state = {
    value: 1,
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render(){
    return(
        <Radio.Group className='choice' 
                     onChange={this.onChange} 
                     value={this.state.value}>
          <Radio  
              value={1}>Lien URL Agenda : 
                  <Input 
                      placeholder="Adresse web de l'agenda" 
                      disabled={this.state.value===2 ? true : false}
                  />
          </Radio>
          <Radio 
              value={2}>Fichier csv : 
                  <Button 
                      disabled={this.state.value===1 ? true : false}>Importer Csv
                  </Button>
          </Radio>
        </Radio.Group>
    );
  }
}
export default OptionChoice;
