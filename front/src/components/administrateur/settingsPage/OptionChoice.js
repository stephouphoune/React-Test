import React, { Component } from 'react';
import { Button, Radio, Input, message, Upload} from 'antd';
import './OptionChoice.css';

const props = {
  accept:'.csv',
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`Votre fichier ${info.file.name} a bien été uploadé !`);
    } else if (info.file.status === 'error') {
      message.error(`Problème lors de l'upload du fichier ${info.file.name} !`);
    }
  },
};

class OptionChoice extends Component{
  state = {
    value: 1,
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render(){
    return(
      <Radio.Group className='choice' 
                   onChange={this.onChange} 
                   value={this.state.value}>
              <Radio //Ici je mets Input en mode dégueulasse parce que j'ai pas 
                    //l'espace sinon entre : et Adresse web de l'agenda
                    value={1}>Lien URL Agenda : <Input 
                    placeholder="Adresse web de l'agenda" 
                    disabled={this.state.value===2 ? true : false}
                    
                    />
              </Radio>
              <Radio 
                  value={2}>Fichier csv : <Upload {...props}>
                    <Button icon="upload" 
                       disabled={this.state.value===1 ? true : false}>Importer .csv
                    </Button>
                    </Upload>
              </Radio>
      </Radio.Group>
    );
  }
}
export default OptionChoice;
