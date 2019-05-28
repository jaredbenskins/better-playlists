import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from "query-string";

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
        <input type = "text" onKeyUp = {(event) => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}
class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div style = {{...defaultStyle, width: "20%", display: "inline-block"}}>
        <img src = {playlist.imageUrl} style = {{width: "80%"}}/>
        <h3>{playlist.name}</h3>
        <ul>{playlist.songs.map(song => <li>{song.name}</li>)}</ul>
      </div>
    );
  }
}


class App extends Component {

  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    }
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if(!accessToken) {
      return;
    }

    fetch("https://api.spotify.com/v1/me", {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
        }
      }))

      fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {'Authorization': 'Bearer ' + accessToken}
      }).then((response) => response.json())
        .then(data => this.setState({
          playlists: data.items.map(item => ({
                name: item.name,
                imageUrl: item.images[0].url,
                songs: []
              }))
            }))
          }


  render() {
    let name = "Jared"
    let headerStyle = {color: "red", "font-size": "50px"}
    let playlistsToRender = this.state.user && this.state.playlists
      ? this.state.playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())) 
      : [];


    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style = {{fontSize: 54}}>{this.state.user.name}'s Playlists</h1>
          <PlaylistCounter playlists = {playlistsToRender}/>
          <HourCounter playlists = {playlistsToRender}/>
        
        <Filter onTextChange = {text => this.setState({filterString: text})}/>

        {playlistsToRender.map(playlist => 
          <Playlist playlist = {playlist} />
        )}

        </div>: <button onClick = {() => window.location = "http://localhost:8888/login"}
         style = {{padding: "20px", fontSize: "50px", marginTop: "20px"}}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
