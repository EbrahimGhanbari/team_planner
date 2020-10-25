const pg = require("pg");
require('dotenv').config();
















// module.exports = {

//   development: {
//     client: 'postgresql',
//     connection: process.env.DATABASE_URL,
//     migrations: {
//       directory: './db/migrations',
//       tableName: 'migrations',
//     },
//     seeds: {
//       directory: './db/seeds',
//     },
//   },

//   production: {
//     client: 'postgresql',
//     connection: process.env.DATABASE_URL,
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: 'migrations',
//     },
//   },

// };



// const conString = process.env.DATABASE_URL;
// const client = new pg.Client(conString);

// let query = `
// DROP TABLE IF EXISTS soccer_indoor;
// CREATE TABLE soccer_indoor(
// id INT PRIMARY KEY      NOT NULL,
// player_name           TEXT NOT NULL,
// team_index         INT      NOT NULL
// );
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (1,'Mohsen', 1);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (2,'Shayan', 2);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (3,'Parsa', 3);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (4,'Faraz', 4);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (5,'Ramin', 5);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (6,'Milad', 6);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (7,'Mehdi', 7);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (8,'Mahziyar', 8);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (9,'Mohammad Reza', 9);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (10,'Milad Ah.', 10);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (11,'MJ', 11);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (12,'Ali T.', 12);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (13,'Ali Z.', 13);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (14,'Vahid', 14);
// INSERT INTO soccer_indoor (id, player_name, team_index) VALUES (15,'Mohammad', 15);
// `;

// client.connect(function (err) {
// if (err) {
//   return console.error("could not connect to postgres", err);
// }
// });

// client.query(query, function (err, result) {
// if (err) {
//   return console.error("error running query", err);
// }
// });

// let players = {};
// client.query('SELECT * FROM soccer_indoor;', function(err, result) {
// if(err) {
//   return console.error('error running query', err);
// }

// for (const row of result.rows){
  
//   players[row.team_index] = row.player_name;
// }
// console.log(players);
// // client.end();
// });