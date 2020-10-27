const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const pg = require("pg");
require('dotenv').config();
const fs = require("fs");


const {
  randomizPlayers,
  readPlayers,
  getRandomIndex,
  readPlayerFromDatabase
} = require("./helperFunctions");

// const { seedPlayers } = require("./db/seeds/players");
// const { createTables } = require("./db/schema/tables");

// createTables();
// seedPlayers();



// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://indoorsoccerteams.herokuapp.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};
App.use(cors(corsOptions));



// Sample GET route
// if (process.env.NODE_ENV === "production") {
// Serve any static files
App.use(Express.static(path.join(__dirname, "client/build")));
// Handle React routing, return all requests to React App

// App.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });
// }


const conString = process.env.DATABASE_URL_ELEPHANT;
const client = new pg.Client(conString);

client.connect();


let players = {};
client.query('SELECT * FROM soccer_indoor;', function (err, result) {
  for (const row of result.rows) {

    players[row.team_index] = row.player_name;
  }
  client.end();

});

App.get("/api/data", (req, res) => res.json(players));

setInterval(() => {
  App.get("/api/data", (req, res) => res.json(players));
  let players = {};
  const conString = process.env.DATABASE_URL_ELEPHANT;
  const client = new pg.Client(conString);

  client.connect();
  client.query('SELECT * FROM soccer_indoor;', function (err, result) {
    for (const row of result.rows) {

      players[row.team_index] = row.player_name;
    }
    client.end();

  });

}, 5000);



App.post("/reshuffle", (req, res) => {

  if (Object.keys(req.body)[0] === "1") {
    // seedPlayers();
    const newPlayersList = randomizPlayers(players);
    // seedPlayers(newPlayersList);

    let query = 'DELETE FROM soccer_indoor;';
    for (const index in newPlayersList) {
      query += `INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (${index}, '${newPlayersList[index]}', ${index});`

    }

    const conString = process.env.DATABASE_URL_ELEPHANT;
    const client = new pg.Client(conString);
    client.connect();
    client.query(query);
    client.query('SELECT * FROM soccer_indoor;', function (err, result) {
      console.log('result.rows:', result.rows)

      for (const row of result.rows) {
        players[row.team_index] = row.player_name;
      }

      client.end();

    });
    App.get("/api/data", (req, res) => res.json(newPlayersList))

  }
});

const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
