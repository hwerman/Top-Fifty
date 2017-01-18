//A huge thank you to Jonathan Ahrens and Daniel Pease for helping me work through the planning, implementing, and execution phases of this project.
//Special thanks to Irwin Tsay for his guidance and support as my instructional associate.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './xstyle.css';
import './assets/styles/global.css';
import CoverAlbum from './CoverAlbum.jsx';
import Inputbar from './Inputbar.jsx';
import Scoreboard from './Scoreboard.jsx';
import ScoreFinal from './ScoreFinal.jsx';
import Welcome from './Welcome.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ext : {
        artist: '',
        collection: '',
        cover: '',
        albumCount: ''
      },
      int : {
        selected: '',
        selectedId: ''
      },
      answer: {
        currentAnswer: ''
      },
      score: {
        currentScore: 0
      },
      round: {
        currentRound: 0
      },
      responses: []
    }
  }

  componentDidMount(){
    this.getArtist();
  }

  getArtist(){
    console.log('inside artist function');
    //using a promise function to send the artist name acquired from the local database call to the next function
    const promise = new Promise((res, rej) =>
      {
        fetch('/localapi')
        .then(r=> r.json())
        .then((results) => {
          //setting the selected artist for one view
          this.setState({
            int: {
              selected: results[0].name,
              selectedId: results[0].itunesid
            }
          })
        if (this.state.int === "") rej(this.state.int);
        res(this.state.int);
        })
        .catch(err => console.log('Error', err));
      }
    )
    promise.then(result => this.getCover(result));
    }

  getCover(result){
    console.log('inside cover function');
    let thename = result.selected;
    let theId = result.selectedId;
    fetch(`/itunesapi?result=${theId}`)
    .then(r => r.json())
    .then((data) => {
      //make the max random value equal to the count to prevent error
      let rand = (Math.floor(Math.random()*parseInt(data.resultCount) +1));
      //set the details from the api fetch call to the state in app
      this.setState({
        ext: {
          albumCount: parseInt(data.resultCount)
        }
      })
      this.setState({
        ext: {
          artist: data.results[0].artistName,
          collection: data.results[rand].collectionName,
          cover: data.results[rand].artworkUrl100
        }
      })
    })
  .catch(err => console.log('Error', err));
  }

  reset(){
    //reset the values of state in app that are associated with the fetch call made to the itunes api
    this.setState({
      ext : {
        artist: '',
        cover: '',
        collection: '',
        albumCount: ''
      },
      int : {
        selected: '',
        selectedId: ''
      },
      answer: {
        currentAnswer: ''
      }
    })
  }

  showNextView(){
    console.log('next');
    this.getArtist();
  }

  showFinalScore(){
    let albumView = document.querySelector('#container');
    albumView.style.display = 'none';
    let inputBar = document.querySelector('#theBar');
    inputBar.style.display = 'none';
    let scoreboard = document.querySelector('#score');
    scoreboard.style.display='none';
    let endPage = document.querySelector('#final');
    endPage.style.display= 'flex';
  }

  trackAnswer(e){
    this.setState({
      answer: {
        currentAnswer: e.target.value
      }
    })
  }

  handleAnswer(e){
    e.preventDefault();
    this.scoreHandler(e);
    this.checkAnswer(e);
  }

  scoreHandler(e){
    if (this.state.answer.currentAnswer.toUpperCase() === this.state.int.selected.toUpperCase()){
      e.target.childNodes[0].value = '';
      this.setState({
        score: {
          currentScore: parseInt(this.state.score.currentScore) + 10
        }
      })
    } else {
      e.target.childNodes[0].value = '';
      this.setState({
        score: {
          currentScore: parseInt(this.state.score.currentScore)
        }
      })
    }
  }

  checkAnswer(e){
    if (this.state.round.currentRound === 9){
      this.pushArray();
      this.showFinalScore();
    } else {
      this.pushArray();
      this.setState({
        round: {
          currentRound: parseInt(this.state.round.currentRound) + 1
        }
      })
      this.reset();
      this.getArtist();
    };
    }

  pushArray(){
    let allAnswersThusFar = this.state.responses;
    let recentAnswer = {
      'respGiven': this.state.answer.currentAnswer.toUpperCase(),
      'respWanted': this.state.int.selected.toUpperCase(),
      'respCoverUrl': this.state.ext.cover
    }
    allAnswersThusFar.push(recentAnswer);
  }

  hideWelcomePage(){
    let welcomePage = document.querySelector('#welc');
    welcomePage.style.display= 'none';
    let albumView = document.querySelector('#container');
    albumView.style.display = 'flex';
    let inputBar = document.querySelector('#theBar');
    inputBar.style.display = 'flex';
    let scoreboard = document.querySelector('#score');
    scoreboard.style.display='block';
  }

render(){
  return(
    <div>
      <h1><a href='/'>top fifty 2016</a></h1>
        <div id="box">
          <div>
            <Welcome
            hideWelcomePage={this.hideWelcomePage}
            />
          </div>
            <div id="containerMain">
              <Scoreboard
              yourscore={this.state.score.currentScore}
              />
              <CoverAlbum
              cover={this.state.ext.cover}
              artist={this.state.int.selected}
              artistId={this.state.int.selectedId}
              collection={this.state.ext.collection}
              />
              <Inputbar
              answer={this.state.answer.currentAnswer}
              trackAnswer={event => this.trackAnswer(event)}
              handleAnswer={event => this.handleAnswer(event)}
              />
            </div>
          <div>
            <ScoreFinal
            showFinalScore={this.showFinalScore}
            total={this.state.score.currentScore}
            allresponses={this.state.responses}
            />
          </div>
        </div>
    </div>
    )
  }
}

export default App;
