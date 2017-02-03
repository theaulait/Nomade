import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

class App extends Component {
  render() {
    const { className, ... props } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Nomade</h2>
        </div>
        <p className="App-intro">
         Emergency calls!
        </p>
      </div>
    );
  }
}

export default App;
