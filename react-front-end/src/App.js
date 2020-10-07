import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      const allPlayers = Object.values(response.data);
      const teamsOfThree = [];
      for (let i = 0; i < allPlayers.length; i = i + 3 ) {
        teamsOfThree.push(allPlayers.slice(i, i + 3))
      }
      
      console.log(allPlayers)
      console.log(teamsOfThree)
      setPlayers(teamsOfThree);
    })

  }, []);

  
  return (
    <table id="team">
      <tr>
        <th>Team A</th>
        <th>Team B</th>
        <th>Team C</th>
      </tr>
    
        { players.map((player, i) => 
              <tr key={i}>
               <td>{player[0]}</td>
               <td>{player[1]}</td>
               <td>{player[2]}</td>
             </tr>
             
        )
        }
    
      </table>
  );


}


export default App;
