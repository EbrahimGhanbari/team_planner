const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});


const Express = require('express');
const App = Express();
const fs = require('fs');
const BodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// this function generates random number
function getRandomIndex(playerArray) {
  const max = playerArray.length;
  return Math.floor(Math.random() * Math.floor(max));

}

// this function shuffles players
function randomizPlayers (playerObject) {
  const playersArray = Object.values(playerObject);
  const newPlayerjson = {};
  
  let count = 0;
  while (playersArray.length > 0) {

    const playerIndex = getRandomIndex(playersArray);
    const player = playersArray.splice(playerIndex, 1);
    newPlayerjson[count] = player[0];
    count ++;

  }

  return newPlayerjson;
}

let players = {};
setInterval(() => {
  const rawdata = fs.readFileSync('players.json');
  players = JSON.parse(rawdata);

  const newPlayersList = randomizPlayers(players);
  
  console.log(newPlayersList)
  let data = JSON.stringify(newPlayersList);
  fs.writeFileSync('players.json', data);
  
}, 4000);

// Sample GET route
console.log(players)
App.get('/api/data', (req, res) => res.json(players));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

