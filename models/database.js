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
    name TEXT NOT NULL UNIQUE
)
`;
const createTeamsQuery = `
CREATE TABLE IF NOT EXISTS
teams(
    teamName TEXT PRIMARY KEY,
    player1 TEXT NOT NULL references players(name),
    player2 TEXT NOT NULL references players(name)
)
`;

const createGamesQuery = `
CREATE TABLE IF NOT EXISTS
games(
    playnro NUMERIC PRIMARY KEY,
    team1 TEXT references teams(teamName),
    team2 TEXT references teams(teamName),
    winner TEXT references teams(teamName),
    layer NUMERIC NOT NULL
)
`

const getPlayersQuery = `
SELECT name FROM players
`;

function playerTable() {
    pool.query(createPlayerQuery, (err, res) => {
        if (err) {
            throw err
        }
        teamTable();
    });
}

function teamTable() {
    pool.query(createTeamsQuery, (err, res) => {
        if (err) {
            throw err
        }
        gamesTable();
    });
}

function gamesTable() {
    pool.query(createGamesQuery, (err, res) => {
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