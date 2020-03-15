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
                    console.log(responseObject.length);
                    if (responseObject.length == 0) {                        
                        window.location = "/";
                    } else {
                        for (i = 0; i < responseObject.length; i++) {
                            playerList.push(responseObject[i].name);
                        }
                        createTeams(playerList, pairList);
                    }
                    // Näytä tämän jälkeen parit
                }
            }
            xhttp.open("GET", "/players", true);
            xhttp.send();
        } else {
            // Näytä parit ja pelit

        }
    } else {        
        // window.location = "../";
    }
}
xhttp.open("GET", "/teams", true);
xhttp.send();


function createTeams(playerList, pairList, index = 1) {

    if (playerList.length < 2) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Rakennetaan pelipuu
        }
        }
        xhttp.open("POST", "/addGames", true);
        xhttp.send();
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
    xhttp.send(JSON.stringify({"name" : "Team " + index, "player1" : randomPlayer1, "player2" : randomPlayer2}));

};




// Pelin jälkeen kaikki taulut tyhjennetään
function stopGame() {
    var txt = "Oletko varma, että haluat lopettaa pelin? Kaikki pelitiedot tyhjennetään.";
    if (confirm(txt)) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 & this.status == 200) {
                window.location = "../"
            }
        }
        xhttp.open("POST", "/endGame", true);
        xhttp.send();
    } else {
        var alertText = "Peli jatkuu"
        document.getElementById("messageBox").innerHTML = alertText;
    }
}

// Luodaan ensimmäinen kierros joukkueineen
function createRound(teamList) {
    for (round = 0; round  = 5; round++ ) {
        if (round == 1) {
            for (i = 0; i < teamList.length; i++ ) {
                
            }
        }
    }
    
}