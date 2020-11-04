const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const pg = require("pg");
require('dotenv').config();
const fs = require("fs");
const { randomizPlayers } = require("./helperFunctions");


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

//This is to make sure in development and production mode communication btw back and front end will be allowed
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

// Reading built file in production mode
// if (process.env.NODE_ENV === "production") {
  App.use(Express.static(path.join(__dirname, "client/build")));
// }

let players = {};

// Restarting server every 5 second
setInterval(() => {
  const conString = process.env.DATABASE_URL_ELEPHANT;
  const client = new pg.Client(conString);

  client.connect();
  client.query('SELECT * FROM soccer_indoor;', function (err, result) {
    //grab data from database and put it in a variable
    for (const row of result.rows) {
      players[row.team_index] = row.player_name;
    }
    client.end();
  });

  App.get("/api/data", (req, res) => res.json(players));

}, 5000);

// Handle the reshuffle request from front end
App.post("/reshuffle", (req, res) => {

  if (Object.keys(req.body)[0] === "1") {
    const newPlayersList = randomizPlayers(players);
    let query = 'DELETE FROM soccer_indoor;';
    for (const index in newPlayersList) {
      query += `INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (${index}, '${newPlayersList[index]}', ${index});`

    }

    const conString = process.env.DATABASE_URL_ELEPHANT;
    const client = new pg.Client(conString);
    client.connect();
    client.query(query, function (err, result) {
      client.end();
    });
  }
});

const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
