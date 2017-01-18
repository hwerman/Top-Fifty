import React, { Component } from 'react';
import style from './xstyleScoreboard.css';

class Scoreboard extends Component{

  render(){
    return(
      <div>
      <div id="score">
        <p>Your current score: {this.props.yourscore}</p>
      </div>
      </div>
    )
  }
}

export default Scoreboard;
