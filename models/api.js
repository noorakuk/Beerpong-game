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

function deleteAll(table) {
    const query = "DELETE FROM " + table + " RETURNING *"
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.log("Successful deleting");
    })
}



module.exports = { addPlayer, deleteAll }
