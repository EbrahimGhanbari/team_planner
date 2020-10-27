const pg = require("pg");
require('dotenv').config({ path: __dirname + '/./../../.env' })



const createTables = () => {


    const query = `
                DROP TABLE IF EXISTS soccer_indoor;
                    CREATE TABLE soccer_indoor(
                    id INT PRIMARY KEY      NOT NULL,
                    player_name           TEXT NOT NULL,
                    team_index         INT      NOT NULL);`;

    const conString = process.env.DATABASE_URL;
    const client = new pg.Client(conString);

    client.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
    });

    client.query(query, function (err, result) {
        if (err) {
            return console.error("error running query", err);
        }
        client.end();
    });

}

module.exports = { createTables };