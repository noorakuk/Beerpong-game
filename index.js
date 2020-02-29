// Page to create the server and initalize it
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')


const initializeDB = require('./models/database')
const changeDB = require("./models/api")

app.use("/styles", express.static(__dirname + '/styles'));
app.use("/controller", express.static(__dirname + '/controller'));
app.use("/views", express.static(__dirname + '/views'))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/main-page.html'));
})

app.get("/players", initializeDB.getPlayers)
app.get("/teams", changeDB.getTeams)
app.post("/addPlayer", changeDB.addPlayer)
app.post("/addTeam", changeDB.addTeam)
app.post("/addGame", changeDB.addGame)
app.post("/delete", (req, res) => {
    var table = req.body.table    
    try {
        changeDB.deleteAll(table);
        res.statusCode = 200;
        res.send();
    } catch (err) {
        res.statusCode = 500
        res.send(err);
    }
})
app.post("/endGame", (req, res) => {
    try {
        changeDB.stopGameDeleting();
        res.statusCode = 200;
        res.send(); 
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
    
    
})

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname + '/views/game.html'))
})

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
