// TODO:
// Seuraavaa ei toteuteta jos kannassa on joukkueet valmiina

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var teamList = JSON.parse(this.responseText);
        if (teamList.length == 0) {

            // Uusi request
            var pairList = [];

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var playerList = [];
                    var responseObject = JSON.parse(this.responseText);
                    for (i = 0; i < responseObject.length; i++) {
                        playerList.push(responseObject[i].name);
                    }
                    createTeams(playerList, pairList);
                }
            }
            xhttp.open("GET", "/players", true);
            xhttp.send();
        }
    }
}
xhttp.open("GET", "/teams", true);
xhttp.send();




// Luodaan ensimmäinen kierros joukkueineen

// Luodaan ehkä muutkin kierrokset, mutta ilman joukkueita

function createTeams(playerList, pairList, index = 1) {

    if (playerList.length < 2) {
        return;
    }
    var randomIndex = Math.floor(Math.random() * playerList.length);
    const randomPlayer1 = playerList[randomIndex];
    playerList.splice(randomIndex, 1);
    randomIndex = Math.floor(Math.random() * playerList.length);
    const randomPlayer2 = playerList[randomIndex];
    playerList.splice(randomIndex, 1);
    pairList.push([randomPlayer1, randomPlayer2]);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        createTeams(playerList, pairList, index + 1);
    }
    }
    xhttp.open("POST", "/addTeam", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"name" : "Team " + index, "player1" : randomPlayer1, "player2" : ran}));

};


// Pelin jälkeen kaikki taulut tyhjennetään