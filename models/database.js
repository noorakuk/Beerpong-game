const { Pool } = require('pg');
require('dotenv').config();

const connectionString =process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
});

const createPlayerQuery = `
CREATE TABLE IF NOT EXISTS
players(
    id SMALLSERIAL PRIMARY KEY,
    name TEXT NOT NULL
)
`;

const getPlayersQuery = `
SELECT name FROM players
`;

function playerTable() {
    pool.query(createPlayerQuery, (err, res) => {
        if (err) {
            throw err
        }
    });
}

const getPlayers = (request, response) => {
    pool.query(getPlayersQuery, (err, res) => {
        if (err) throw err
        response.status(200).json(res.rows);
    });
}

module.exports = { playerTable, getPlayers }