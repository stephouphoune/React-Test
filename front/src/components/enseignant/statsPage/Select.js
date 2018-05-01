import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Steps, Button, message, Row, Icon} from 'antd';
import TaskEdit from '../homePage/card/TaskEdit';
import { getStats } from '../../../appState/actions/stats'
import './Select.css'

const Step = Steps.Step;
const steps = [{
  title: 'Activité',
  content: 'Sélection de l\'Activité',
  icon:<Icon type="pie-chart" />
}, {
  title: 'Projet',
  content: 'Sélection du Projet', 
  icon:<Icon type="pie-chart" />
},
{
  title: 'Analyse réussie !',
  content: 'Sélection du Projet', 
  icon:<Icon type="smile-o" />
},

];
//ici ecrire une fonction qui affice un tableau pour selectionner les elements a inserer dans le graphique
//suivant l'etape a laquelle on se trouve dans le step (1)=> selection de l activite (2)=> selection du Projet
//(3)=> selection de la tâche puis bouton DONE et mise a jour auto du camembert et du graphique

class Select extends Component {
  state = {
    selectedActivity: null,
    selectedProject: null,
    current: 0,
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleActivitySelect = selectedActivity => {
    console.log('selectedActivity', selectedActivity)
    this.setState({
      selectedActivity,
      selectedProject: null,
      current: selectedActivity ? 1 : 0
    })
  }

  handleProjectSelect = selectedProject => {
    this.setState({
      selectedProject,
      current: 1
    })
  }

  handleGetStats = () => {
    this.next();
    this.props.getStats(this.state.selectedProject)
    this.props.isLoaded(true)
  }

  getProjectFromActivity = () => this.props.projects
    .filter(project => project.activityId === this.state.selectedActivity.id)

  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step icon={item.icon} key={item.title} title={item.title} />)}
        </Steps>
        <Row style={{marginTop:12}} type="flex" justify="start" align="middle"> 
          <TaskEdit
            placeholder="Actvité"
            selectedData={this.state.selectedActivity}
            onSelect={this.handleActivitySelect}
            data={this.props.activities}
            dataNameKey="name"
          /> 
          {current >= 1 && 
            <TaskEdit
              placeholder="Projet"
              selectedData={this.state.selectedProject}
              onSelect={this.handleProjectSelect}
              data={this.getProjectFromActivity()}
              dataNameKey="name"
            /> 
          }
          <div style={{marginLeft:8}}>
            {current >=1 && this.state.selectedProject && 
              <Button type="primary" onClick={this.handleGetStats}>
                Terminer
              </Button>
            }
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  activities: store.activity.activities,
  projects: store.project.projects
})

const mapDispatchToProps = dispatch => ({
  getStats: getStats(dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
