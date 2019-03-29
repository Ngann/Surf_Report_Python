import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import { wwdScore, waveScore, swpScore } from './functions';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      surfData: [],
      waveScore: [],
      swpScore: [],
      wwdScore: [],
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
        <Table striped bordered hover size="sm" >
            <thead >
              <tr>
                <th>Date</th>
                <th>SwH</th>
                <th>WVHT</th>
                <th>SwP</th>
                <th>WWH</th>
                <th>WWP</th>
                <th>SwD</th>
                <th>WWP</th>
                <th>WAVE</th>
                <th>Score WWP</th>
                <th>Score Wave</th>
                <th>Score SwP</th>
              </tr>
            </thead>
          { this.state.surfData.map(surfDataRow => {
              if ((surfDataRow.Year == 2019) & (surfDataRow.Month == 3) & (surfDataRow.Day == 28)) {
                return (
                  <tbody>
                    <tr>
                      <td>{surfDataRow.Year}-{surfDataRow.Month}-{surfDataRow.Day} </td>
                      <td>{surfDataRow.SwH}</td>
                      <td>{surfDataRow.WVHT}</td>
                      <td>{surfDataRow.SwP}</td>
                      <td>{surfDataRow.WWH}</td>
                      <td>{surfDataRow.WWP}</td>
                      <td>{surfDataRow.SwD}</td>
                      <td>{surfDataRow.WWP}</td>
                      <td>{(surfDataRow.SwP * surfDataRow.SwH).toFixed(2)}</td>
                      <td>{ wwdScore(surfDataRow.WWP)}</td>
                      <td>{ waveScore(surfDataRow.SwP, surfDataRow.SwH)}</td>
                      <td>{ swpScore(surfDataRow.SwP)}</td>
                    </tr>
                  </tbody>
                )
              }
          })
        }
          </Table>
        <h3>Score of the Day</h3> 
      </div>
    );
  }
}

export default App;
