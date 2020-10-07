import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>        
      </div>
    );
  }
}

export default App;


// import React from 'react';
// import './App.css';

// const players = [
// "Mohammad", "Mohsen", "Parsa", 
// "Milad Ah.", "Milad", "Ramin",
// "Ali Z", "Ali T", "Faraz", 
// "Vahid", "MJ", "Mahziyar",
// "Shayan", "Ehsan", "Mehdi"
// ];


// function App() {
//   return (
// <table id="team">
//   <tr>
//     <th>Team A</th>
//     <th>Team B</th>
//     <th>Team C</th>
//   </tr>

//     { teams["0"].map((element, i) => 
//           <tr key={i}>
//            <td>{teams["0"][i]}</td>
//            <td>{teams["1"][i]}</td>
//            <td>{teams["2"][i]}</td>
//          </tr>
//     )
       
//     }

//   </table>
//   );
// }

// export default App;
