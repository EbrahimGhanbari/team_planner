const fs = require("fs");

// this function shuffles players
const randomizPlayers = (playerObject) => {
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
};

// This function read players from json
const readPlayers = (fileName) => {
  const rawdata = fs.readFileSync(fileName);
  return JSON.parse(rawdata);
};

// this function generates random number
function getRandomIndex(playerArray) {
    const max = playerArray.length;
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = { randomizPlayers, readPlayers, getRandomIndex };
