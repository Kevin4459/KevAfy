import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
const NODE_URL = 'http://127.0.0.1:3001'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tracks: [],
      currentTrack: null,
      playlist: [],
    }
  }
  componentDidMount = async () => {
    this.fetchAllTracks();
    this.fetchPlaylist();
  };
  fetchAllTracks = async () => {
    const response = await fetch(`${NODE_URL}/tracks`);
    const tracks = await response.json();
    // console.log(tracks);
    this.setState({ tracks });   
  }
  
  fetchPlaylist = async () => {
    const response = await fetch(`${NODE_URL}/playlist/tracks`);
    const playlist = await response.json();
    this.setState({playlist})
  }
  addToPlaylist = async (trackId) => {
    const response = await fetch(`${NODE_URL}/playlist/tracks`, {
      method:"POST",    
      headers:{
              "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trackId
      })
  
    });
    const track = this.state.tracks.find((track) => track.id === trackId)
    this.setState({
      playlist: [...this.state.playlist, track]
    })
  }
  deleteFromPlaylist = async  (trackId) => {
    console.log(trackId)
    const response = await fetch(`${NODE_URL}/playlist/tracks/${trackId}`, {
      method:"DELETE",    
      headers:{
              "Content-Type": "application/json"
      },
    });
    const playlist = this.state.playlist.filter(remove)
    
    function remove(track){
      return track.id !== trackId
  }
    this.setState({
      playlist
    })
    console.log(playlist)
  }
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <br />
        <div align="center">
          <input placeholder="search"/>
        </div>
        <ReactAudioPlayer src={this.state.currentTrack} controls autoPlay/>
        <h1>Playlist:</h1>
          <br />
        
        {this.state.playlist.map(track => {
      return (
        <div align="center">
          <img src={track.album.images[0].url} width="30%" />
          <h1>{track.name}</h1>
          <button onClick={() => this.setState({currentTrack: track.preview_url})}>Play</button>
          <button onClick={() => this.deleteFromPlaylist(track.id)}>Remove From Playlist</button>
          <h3>Release date:{track.album.release_date}</h3>
        </div>
      )
    })}
        <h1>All Songs:</h1>
       {this.state.tracks.map(track => {
      return (
        <div align="center">
          <img src={track.album.images[0].url} width="30%" />
          <h1>{track.name}</h1>
          <button onClick={() => this.setState({currentTrack: track.preview_url})}>Play</button>
          <button onClick={() => this.addToPlaylist(track.id)}>Add to Playlist</button>
          <h3>Release date:{track.album.release_date}</h3>
        </div>
      )
    })}
    </div>
    )
  }
}
export default App;