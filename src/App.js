import React, { Component } from 'react';
import io from 'socket.io-client'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      message: []
    }
  }

  componentDidMount() {
    const socket = io();
    console.log('Running socket on the client...')
  }

  render() {
    return (
      <div className="App">
        <h1> React! </h1>
      </div>
    );
  }

}

export default App;
