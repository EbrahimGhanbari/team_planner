const pg = require("pg");
require('dotenv').config({ path: __dirname + '/./../../.env' })
const fs = require("fs");
const { readPlayers } = require("../../helperFunctions")


const seedPlayers = (playerList = {}) => {

  let players = playerList;

  if (!Object.keys(playerList).length) {
    const allPlayers = readPlayers("./db/seeds/players.json");
    players = allPlayers.main;
  }

  let query = '';
  for (const index in players) {
    query += `INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (${index}, '${players[index]}', ${index});`
    
  }


  const conString = process.env.DATABASE_URL;
  const client = new pg.Client(conString);

  client.connect(function (err) {
    if (err) {
      return console.error("could not connect to postgres", err);
    }
  });

  client.query("DELETE FROM soccer_indoor;");


  client.query(query, function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    client.end();
  });

}


module.exports = { seedPlayers };

