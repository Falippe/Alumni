document.getElementById('playerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const document = document.getElementById('document').value;
    const photo = document.getElementById('photo').files[0];
    
    const reader = new FileReader();
    reader.onloadend = function() {
        const playerData = {
            name: name,
            dob: dob,
            document: document,
            photo: reader.result
        };
        
        savePlayer(playerData);
        displayPlayers();
    };
    
    if (photo) {
        reader.readAsDataURL(photo);
    } else {
        const playerData = {
            name: name,
            dob: dob,
            document: document,
            photo: null
        };
        
        savePlayer(playerData);
        displayPlayers();
    }
});

function savePlayer(playerData) {
    let players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(playerData);
    localStorage.setItem('players', JSON.stringify(players));
}

function displayPlayers() {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';
    
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} - ${player.dob} - ${player.document}`;
        
        if (player.photo) {
            const img = document.createElement('img');
            img.src = player.photo;
            img.width = 50;
            img.height = 50;
            listItem.appendChild(img);
        }
        
        playerList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', displayPlayers);
