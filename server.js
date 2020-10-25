const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const pg = require("pg");
require('dotenv').config();
const fs = require("fs");

// const knexfile = require('./knexfile')["development"]
// console.log(knexfile);

const {
  randomizPlayers,
  readPlayers,
  getRandomIndex,
} = require("./helperFunctions");
// const config = require("./knexfile")("production")


var conString = process.env.DATABASE_URL;
var client = new pg.Client(conString);

let query = `
DROP TABLE IF EXISTS soccer_indoor;
CREATE TABLE soccer_indoor(
  id INT PRIMARY KEY      NOT NULL,
  player_name           TEXT NOT NULL,
  team_index         INT      NOT NULL
);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (1,'Mohsen', 1);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (2,'Shayan', 2);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (3,'Parsa', 3);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (4,'Faraz', 4);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (5,'Ramin', 5);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (6,'Milad', 6);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (7,'Mehdi', 7);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (8,'Mahziyar', 8);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (9,'Mohammad Reza', 9);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (10,'Milad Ah.', 10);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (11,'MJ', 11);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (12,'Ali T.', 12);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (13,'Ali Z.', 13);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (14,'Vahid', 14);
INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (15,'Mohammad', 15);
`;

client.connect(function (err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});

client.query(query, function (err, result) {
  if (err) {
    return console.error("error running query", err);
  }
});

// let players = {};
// client.query('SELECT * FROM soccer_indoor;', function(err, result) {
//   if(err) {
//     return console.error('error running query', err);
//   }
 
//   for (const row of result.rows){
    
//     players[row.team_index] = row.player_name;
//   }
//   console.log(players);
//   // client.end();
// });

let players = readPlayers("players.json");
// console.log(players);

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://shrouded-journey-38552.herokuapp.com",
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

const resetTime = 40000; // 5 days
setInterval(() => {
  const newPlayersList = randomizPlayers(players);

  let data = JSON.stringify(newPlayersList);
  fs.writeFileSync("players.json", data);
  players = readPlayers("players.json");
}, resetTime);

// Sample GET route
// if (process.env.NODE_ENV === "production") {
// Serve any static files
App.use(Express.static(path.join(__dirname, "client/build")));
// Handle React routing, return all requests to React App

// App.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });
// }

App.get("/api/data", (req, res) => res.json(players));

App.post("/reshuffle", (req, res) => {
  console.log(Object.keys(req.body)[0]);

  if (Object.keys(req.body)[0] === "123456789") {
    const newPlayersList = randomizPlayers(players);
    let data = JSON.stringify(newPlayersList);

    fs.writeFileSync("players.json", data);
    players = readPlayers("players.json");
  }
});

// const connection = {
//   host     : 'localhost',
//   user     : 'postgres',
//   password : 'postgres',
//   database : 'soccer',
//   port     : '5432'
// };

// const pool = new Pool(connection);

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const connectionString =
//   "postgres://zyvxqzcvlikqjy:2d201c21003d340d793443de85691da91628709a6709822092234ac675ca8f7c@ec2-52-2-82-109.compute-1.amazonaws.com:5432/d5es9rf9bdgaen";
// // const pool = new pg.Pool()
// const pool = new Pool({
//   connectionString: connectionString,
// });

// pool.connect(function (err, client, done) {
//   client.query(
//     'INSERT INTO players(players, team_index) VALUES ("Mohsen", 1);',
//     function (err, result) {
//       // done();
//       if (err) {
//         reject(err);
//         return;
//       }
//       console.log(result.rows);
//     }
//   );
// });
// pool.end()

const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
