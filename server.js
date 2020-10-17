

const Express = require('express');
const App = Express();
const compression = require('compression')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs');
const BodyParser = require('body-parser');
const cors = require('cors');



// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));




const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://shrouded-journey-38552.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
App.use(cors(corsOptions))






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
  
  let data = JSON.stringify(newPlayersList);
  fs.writeFileSync('players.json', data);
  
}, 4000);



// Sample GET route
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  // App.use(Express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React App

  App.get('/api/data', (req, res) => res.json(players));
  // App.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  // });
}

App.get('/api/data', (req, res) => res.json(players));


const PORT = process.env.PORT || 8080;
App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

