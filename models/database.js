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

pool.query(createPlayerQuery, (err, res) => {
    console.log(err, res)
    pool.end()
});