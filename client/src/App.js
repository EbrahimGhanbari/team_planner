import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        console.log(response.data);
        // handle success
        const allPlayers = Object.values(response.data);
        const teamsOfThree = [];
        for (let i = 0; i < allPlayers.length; i = i + 3) {
          teamsOfThree.push(allPlayers.slice(i, i + 3));
        }

        console.log(allPlayers);
        console.log(teamsOfThree);
        setPlayers(teamsOfThree);
      });
  }, []);

  const reshuffle = () => {
    
    const password = prompt('Please enter password');

    // event.preventDefault();
    axios
      .post("http://localhost:8080/reshuffle", password)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const subs = ["Nasser", "MohammadReza"];

  return (
    <div>
      <table className="team">
        <tr>
          <th>Team A</th>
          <th>Team B</th>
          <th>Team C</th>
        </tr>

        {players.map((player, i) => (
          <tr key={i}>
            <td>{player[0]}</td>
            <td>{player[1]}</td>
            <td>{player[2]}</td>
          </tr>
        ))}
      </table>
      <table className="team subs">
        <tr>
          <th>Subs</th>
        </tr>

        {subs.map((sub, i) => (
          <tr key={i}>
            <td>{sub}</td>
          </tr>
        ))}
      </table>

      <table className="team subs">
        <tr>
          <th>Address:</th>
        </tr>
        <tr>
          <td>7555 Falconridge Blvd NE #10, Calgary, AB T3J 0C9</td>
        </tr>
        <tr>
          <th>Reshuffle Players:</th>
        </tr>
        <tr>
          <td onClick={reshuffle}>
            Click Here to Re-Shuffle
          </td>
        </tr>
        <tr>
          <th>Account</th>
        </tr>
        <tr>
          <td>
            <a
              target="_blank"
              href="https://www.shortreckonings.com/sr#RXFVCCCM"
            >
              Accounts
            </a>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default App;
