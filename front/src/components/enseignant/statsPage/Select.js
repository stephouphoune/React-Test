import React, { Component } from 'react';
import { Steps, Button, message, Row} from 'antd';
import TaskEdit from '../homePage/card/TaskEdit';
import './Select.css'

const Step = Steps.Step;
const steps = [{
  title: 'Activité',
  content: 'Sélection de l\'Activité',
}, {
  title: 'Projet',
  content: 'Sélection du Projet',
  
}, {
  title: 'Tâche',
  content: 'Sélection de la Tâche',
}];
//ici ecrire une fonction qui affice un tableau pour selectionner les elements a inserer dans le graphique
//suivant l'etape a laquelle on se trouve dans le step (1)=> selection de l activite (2)=> selection du Projet
//(3)=> selection de la tâche puis bouton DONE et mise a jour auto du camembert et du graphique

class Select extends Component {
    state = {
      current: 0,
    };
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }


  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Row style={{marginTop:12}} type="flex" justify="start" align="middle">
          <TaskEdit placeholder={steps[this.state.current].content}/>
          <div style={{marginLeft:8}}>
            {
              this.state.current < steps.length - 1
              &&
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            }
            {
              this.state.current === steps.length - 1
              &&
              <Button type="primary" onClick={() => message.success('Analyse terminée')}>
                Done
              </Button>
            }
            {
              this.state.current > 0
              &&
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            }
          </div>
        </Row>
      </div>
    );
  }
}
export default Select;
