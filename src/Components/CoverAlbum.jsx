import React, { Component } from 'react';
import style from './xstyleCoverAlbum.css';

class CoverAlbum extends Component{

  render(){
    return(
      <div id="container">
      <div id="taken">
          <div id="taken1">
            <h2>Album: <br></br> {this.props.collection}</h2>
          </div>
          <div id="taken2">
            <div id="blacksquare"></div>
            <img src={this.props.cover}/>
          </div>
      </div>
      </div>
    )
  }
}

export default CoverAlbum;
