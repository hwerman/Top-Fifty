import React, { Component } from 'react';
import style from './xstyleWelcome.css';

class Welcome extends Component{

  render(){
    return(
      <div>
      <div id="welc">
        <h2>Welcome</h2>
        <br></br>
          <div id="txt">
            <h3>Ready to test your knowledge on <br></br><span id="title">Billboard's top 50 artists</span> of 2016?
            <br></br>When you see the title and cover of an album, <br></br> enter the correct artist and gain ten points.<br></br>
            Click the button below to begin.</h3>
          </div>
          <div id="thebuttonline">
          <button id="begin" onClick={this.props.hideWelcomePage}>Begin</button>
          </div>
      </div>
      </div>
    )
  }
}

export default Welcome;
