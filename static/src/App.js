import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      surfData: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000', {
      // credentials: 'same-origin'
    })
      .then(response => response.json())
      .then(surfData => this.setState({ surfData }));
  }

  render() {
    return (
      <div className="App">
        { this.state.surfData.map(function name(surfDataRow){
          return (<p>year:{surfDataRow.Year}</p>)
        })
        }
      </div>
    );
  }
}

export default App;
