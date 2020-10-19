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

const readPlayers = (fileName) => {
  const rawdata = fs.readFileSync(fileName);
  return JSON.parse(rawdata);
};

module.exports = { randomizPlayers, readPlayers };
