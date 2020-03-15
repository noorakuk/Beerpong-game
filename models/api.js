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

// const addGame = (request, response) => {
//     const queryString = "INSERT INTO games(playnro, team1, team2, layer) VALUES($1, $2, $3) RETURNING *"
//     const value = [request.body.playnro, request.body.team1, request.body.team2, request.body.layer];
//     pool.query(queryString, value, (err, res) => {
//         if (err) throw err;
//         response.status(200).json(res.rows);
//     })
// }

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

function addGameTeams(gameId, layer, team1, team2) {
    return new Promise(resolve => {
        setTimeout(() => {
            var winner = null;
            if (team2 == null) {
                winner = team1;
            }

           const query = "INSERT INTO games (playnro, team1, team2, winner, layer) VALUES ($1, $2, $3, $4, $5)";
            const vars = [gameId, team1, team2, winner, layer];
            pool.query(query, vars, (err, res) => {
            if (err) throw err;
                resolve(res.rows);
            }) 
        
        }, 1000);
    })
}

async function createGames() {
    const teams = await getTeamList();
    var playCounter = 0;

    // First layer are with random teams
    for (i = 0; i < teams.length; i = i + 2) {
        playCounter++;

        if (i == teams.length - 1) {
            await addGameTeams(playCounter, 1, teams[i].teamname, null);
        } else {
            var teamname1 = teams[i].teamname;
            var teamname2 = teams[i+1].teamname;
            await addGameTeams(playCounter, 1, teamname1, teamname2)
        }

        
    }
    var newGameAmount = Math.ceil(playCounter/2);
    
    // // After first layer
    createGameLayer(newGameAmount, playCounter + 1, 2);
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
            deleteAll("players");
            console.log("Pelitiedot tyhjennetty");  
        })
    })
}

function addGameNull(layer, gameId) {

    return new Promise(resolve => {
        setTimeout(() => {
           const query = "INSERT INTO games (playnro, layer) VALUES ($1, $2)";
            const vars = [gameId, layer];
            pool.query(query, vars, (err, res) => {
            if (err) throw err;
                console.log("Peli "+ res.rows + " lisätty kantaan");
                resolve(res.rows);
            }) 
        
        }, 1000);
    })
   
}

// Reqursive way to create games layer by layer until the final game
// First layer should be creating before this one, because teams are null here
// Kind of PRIVATE funktion!!
async function createGameLayer(playAmount, firstGameId, layer) {
    var gameId = firstGameId;
    if (playAmount == 1) {
        await addGameNull(layer, gameId);
        return;
    } else {
        for (i = 1; i <= playAmount; i++) {
            await addGameNull(layer, gameId);
            gameId++;
        }
        createGameLayer(Math.ceil(playAmount/2), gameId, layer + 1);
    }
}


module.exports = { addPlayer, addTeam, createGames, deleteAll, getTeams, stopGameDeleting }