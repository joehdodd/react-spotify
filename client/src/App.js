import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.css';

const spotify = new SpotifyWebApi();

export default class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotify.setAccessToken(token);
    }
    console.log(params);
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }
  getHashParams = () => {
    const hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  getNowPlaying = () => {
    spotify.getMyCurrentPlaybackState()
      .then(response => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url
          }
        })
      })
  }
  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888/login'>Login to Spotify</a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }
      </div>
    );
  }
}
