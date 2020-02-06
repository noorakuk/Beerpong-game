// Page to create the server and initalize it
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

const initializeDB = require('./models/database')


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    try {
        initializeDB.playerTable()
        
    } catch (err) {
        console.log(err);
    }
    console.log("Server is listenin on port " + port);

});

// API!
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/main-page.html'));
})
