const Express = require("express");
const App = Express();
const fs = require("fs");
const fsPromise = require("promise-fs");
const BodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const morgan = require("morgan");

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

// this function generates random number
function getRandomIndex(playerArray) {
  const max = playerArray.length;
  return Math.floor(Math.random() * Math.floor(max));
}

// this function shuffles players
function randomizPlayers(playerObject) {
  const playersArray = Object.values(playerObject);
  const newPlayerjson = {};

  let count = 0;
  while (playersArray.length > 0) {
    const playerIndex = getRandomIndex(playersArray);
    const player = playersArray.splice(playerIndex, 1);
    newPlayerjson[count] = player[0];
    count++;
  }

  return newPlayerjson;
}

function readPlayers(fileName) {
  const rawdata = fs.readFileSync("players.json");
  return JSON.parse(rawdata);
}

let players = readPlayers("players.json");
console.log(players);

const resetTime = 432000000; // 5 days
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

const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
