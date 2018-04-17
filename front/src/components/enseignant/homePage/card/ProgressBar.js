import React, { Component } from 'react';
import { Progress, Button } from 'antd';
import './ProgressBar.css';


class ProgressBar extends Component{
  state = {
  percent: 0,
}
increase = () => {
  let percent = this.state.percent + 10;
  if (percent > 100) {
    percent = 100;
  }
  this.setState({ percent });
}
decline = () => {
  let percent = this.state.percent - 10;
  if (percent < 0) {
    percent = 0;
  }
  this.setState({ percent });
}
  render(){
    return(
      <div>
         <Progress className="Progress" percent={this.state.percent} />
       </div>

    );
  }
}
export default ProgressBar;
