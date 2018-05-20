import React, {Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Select, InputNumber, Row, Button, message} from 'antd';
import { getWorkdays, modifyWorkdays } from '../../../appState/actions/workday'

import './Duration.css';

const dayNames = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche'
]

class Duration extends Component{

	state = {
      selectedWorkday:null,
      duration:0
  }
  
  componentWillMount(){
    if (this.props.workdays.length > 0)
    {
      this.setState({
        selectedWorkday: this.props.workdays[0],
        duration:this.props.workdays[0].duration
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.state.workday===null && nextProps.workdays.length > 0)
      this.setState({
        selectedWorkday:nextProps.workdays[0], 
        duration:nextProps.workdays[0].duration
      })
  }

	handleSelect = (day) => {
    const selectedWorkday = this.props.workdays.find((item) => dayNames[item.id] === day)
    this.setState({
      selectedWorkday, 
      duration: selectedWorkday.duration
    })
  }
  
  handleChangeDuration = (newDuration) => {
    this.setState({
      duration:newDuration
    })
  }

  enterLoading = () => {
    this.props.modifyWorkdays(this.state.selectedWorkday.id, this.state.duration)
    this.props.saveUrlCalendar()
    message.success(`Votre demande a bien été prise en compte !`);
  }

  render(){
    return(
      <Fragment>
        <Row type="flex" justify="center" className="Duration"> 
              <Select
                value={dayNames[this.state.selectedWorkday.id]}
                onSelect={this.handleSelect}
                className="Day"
                style={{width:170}}
                placeholder="Sélectionnez un jour"
              >
                  {this.props.workdays.map(workday =>
                    <Select.Option key={workday.id} value={dayNames[workday.id]}>{dayNames[workday.id]}</Select.Option>
                  )}
                  
              </Select>
              <InputNumber className="increment"
                  value={this.state.duration}
                  onChange={this.handleChangeDuration}
                  min={3}
                  max={10}
                  step={1}
                  formatter={value => `${value} H`}
                  parser={value => value.replace('H', '')}
              />
        </Row>
        <Row type="flex" justify="center">
          <Button className="Enregistrer" type="primary" ghost loading={this.props.putLoading} onClick={this.enterLoading}>
            Enregistrer les modifications
          </Button>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  workdays: store.workday.workdays,
  putLoading: store.workday.putLoading
});

const mapDispatchToProps = dispatch => ({
  modifyWorkdays: modifyWorkdays(dispatch),
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Duration);
