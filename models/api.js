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

function getTeamList() {
    return new Promise(resolve => {
        setTimeout(() => {
            const queryString = "SELECT * FROM teams"
            pool.query(queryString, (err, res) => {
            if (err) throw err;            
            resolve(res.rows);
            });
        
        }, 1000);
    })
}

async function createGames() {
    const teams = await getTeamList();

    var playCounter = 0;
    // console.log(teams);

    // First layer are with random teams
    for (i = 0;i < teams.length; i = i + 2) {
        playCounter++;
        var teamname1 = teams[i].teamname;
        var teamname2 = teams[i+1].teamname;
        console.log(teamname1 + " + " + teamname2);
        
    }
    // // After first layer
    // createGameLayer(Math.ceil(playCounter/2), playCounter + 1);
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

// Reqursive way to create games layer by layer until the final game
// First layer should be creating before this one, because teams are null here
// Kind of PRIVATE funktion!!
function createGameLayer(playAmount, firstGameId, layer) {
    var gameId = firstGameId;
    if (playAmount == 1) {
        return;
    } else {
        for (i = 1; i <= playAmount; i++) {
            // const query = "INSERT INTO games (playnro, layer) VALUES ($1, $2)";
            // const vars = [gameId, layer];
            // gameId++;
            // pool.query(query, vars, (err, res) => {
            //     if (err) throw err;
            //     console.log("Peli "+ res.rows + " lisätty kantaan");
            // })
            
        }
        createGameLayer(Math.ceil(playAmount/2), gameId + 1, layer + 1);
    }
}


module.exports = { addPlayer, addTeam, addGame, createGames, deleteAll, getTeams, stopGameDeleting }