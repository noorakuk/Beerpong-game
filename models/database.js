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

function playerTable() {
    pool.query(createPlayerQuery, (err, res) => {
        if (err) {
            throw err
        }
    });
}

module.exports = { playerTable }