import React, { Component } from 'react';
import style from './xstyleScoreFinal.css';

class ScoreFinal extends Component{

  render(){
    const respComponents = this.props.allresponses.map((resp, i) =>
      <div key={i}>
        <img className="coverAl" src={resp.respCoverUrl}/><br></br>
        <span>Your answer: {resp.respGiven}</span><br></br>
        <span>The correct answer: {resp.respWanted}</span><br></br>
      </div>
      )

    return(
      <div>
        <div id="final">
            <br></br>
          <h2>How'd you do?</h2>
            <br></br>
          <h2>
            Final Score: {this.props.total}
          </h2>
          <div id="finalKid">
            {respComponents}
          </div>
        </div>
      </div>
    )
  }
}

export default ScoreFinal;
