import React, { Component } from 'react';
import style from './xstyleInputbar.css';

class Inputbar extends Component{

  render(){
    return(
      <div>
      <div id="theBar">
      <form onSubmit={this.props.handleAnswer}>
        <input
          id="theInput"
          value={this.props.answer.currentAnswer}
          onChange={this.props.trackAnswer}
          type="text"
          placeholder="Name the artist"
          />
        </form>
      </div>
      </div>
    )
  }
}

export default Inputbar;
