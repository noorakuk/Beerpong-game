const { Pool } = require('pg');
require('dotenv').config();

const connectionString =process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
});

const addPlayer = (request, response) => {
    const queryString = "INSERT INTO players(name) VALUES($1) RETURNING name"
    const value = [request.body.name]
    pool.query(queryString, value, (err, res) => {
        if (err) throw err;
        console.log("Successful adding");
        console.log(res.rows);
        response.status(200).json(res.rows)
    })
}

const addTeam = (request, response) => {
    const queryString = "INSERT INTO teams(teamname, player1, player2) VALUES($1, $2, $3) RETURNING *"
    const value = [request.body.name, request.body.player1, request.body.player2]
    pool.query(queryString, value, (err, res) => {
        if (err) throw err;
        console.log("Successful adding");
        console.log(res.rows);
        response.status(200).json(res.rows)
    })
}

const addGame = (request, response) => {
    const queryString = "INSERT INTO games(playnro, team1, team2, layer) VALUES($1, $2, $3) RETURNING *"
    const value = [request.body.playnro, request.body.team1, request.body.team2, request.body.layer];
    pool.query(queryString, value, (err, res) => {
        if (err) throw err;
        response.status(200).json(res.rows);
    })
}

const getTeams = (request, response) => {
    const queryString = "SELECT * FROM teams"
    pool.query(queryString, (err, res) => {
        if (err) throw err;
        response.status(200).json(res.rows);
    })
}

function deleteAll(table) {
    const query = "DELETE FROM " + table + " RETURNING *"
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.log("Successful deleting");
    })
}

function stopGameDeleting() {
    const query = "DELETE FROM games";
    pool.query(query, (err, res) => {
        if (err) throw err;
        query2 = "DELETE FROM teams"
        pool.query(query2, (err, res) => {
            if (err) throw err;
            console.log("Pelitiedot tyhjennetty");  
        })
    })
}


module.exports = { addPlayer, addTeam, addGame, deleteAll, getTeams, stopGameDeleting }