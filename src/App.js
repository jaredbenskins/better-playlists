import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = "#fff";
let defaultStyle = {
  color: defaultTextColor,

};

let fakeServerData = {
  user: {
    name: "David",
    playlists: [
      {
        name: "my favorites",
        songs: [
          {name: "beat it", duration: 1236}, 
          {name: "Mola", duration: 1345},
          {name: "Buttercup", duration: 7000}
        ]
      },
      {
        name: "Discover Weekly",
        songs: [
          {name: "beat it", duration: 1236}, 
          {name: "Mola", duration: 1345},
          {name: "Buttercup", duration: 7000}
        ]
      },
      {
        name: "Another one",
        songs: [
          {name: "beat it", duration: 1236}, 
          {name: "Mola", duration: 1345},
          {name: "Buttercup", duration: 7000}
        ]
      },
      {
        name: "last playlist",
        songs: [
          {name: "beat it", duration: 1236}, 
          {name: "Mola", duration: 1345},
          {name: "Buttercup", duration: 7000}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style = {{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HourCounter extends Component {
  render() {

    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    },[]);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum += eachSong.duration;
    },0);
    return (
      <div style = {{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} Hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style = {defaultStyle}>
        <img/>
        <input type = "text"/>
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    return(
      <div style = {{...defaultStyle, width: "20%", display: "inline-block"}}>
        <img/>
        <h3>Playlist Name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}


class App extends Component {

  constructor() {
    super();
    this.state = {serverData: {}}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
   
  }


  render() {
    let name = "Jared"
    let headerStyle = {color: "red", "font-size": "50px"}
    return (
      <div className="App">
        {this.state.serverData.user ?
        <div>
          <h1 style = {{fontSize: 54}}>{this.state.serverData.user.name}'s Playlists</h1>
          <PlaylistCounter playlists = {this.state.serverData.user.playlists}/>
          <HourCounter playlists = {this.state.serverData.user.playlists}/>
        
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        </div>: <h1>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
