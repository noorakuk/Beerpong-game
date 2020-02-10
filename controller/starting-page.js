// When uploading the page, get all the players from database
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var playerList = JSON.parse(this.responseText);
        for (i = 0; i < playerList.length; i++) {
            var listPart = document.createElement("li");
            listPart.appendChild(document.createTextNode(playerList[i].name));
            document.getElementById("addedPlayers").appendChild(listPart);
        }
    }
}
xhttp.open("GET", "/players", true);
xhttp.send();


// If success add to the list in main-page and add player to the database
function addPlayer(name) {
    // Post request request.body = name
    // If success, add name to list 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var addedName = JSON.parse(this.responseText)[0].name;

        const mess = "Pelaaja " + addedName + " onnistuneesti lisätty kantaan"
        document.getElementById("messText").innerHTML = mess;

        var listPart = document.createElement("li");
        listPart.appendChild(document.createTextNode(addedName));
        document.getElementById("addedPlayers").appendChild(listPart);
    }
    };
    xhttp.open("POST", "/addPlayer", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"name" : name}));
}

// Creating post request which remove all players from database
function removeAll() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const mess = "Kaikki pelaajat poistettu kannasta"
        document.getElementById("messText").innerHTML = mess;
        const playerList = document.getElementById("addedPlayers");
        while (playerList.firstChild) {
          playerList.removeChild(playerList.firstChild);
        }
    }
    };
    xhttp.open("POST", "/delete", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({"table" : "players"}));
}
