async function getAllGames() {
    const myObject = await fetch("getAllGames");
    const myText = await myObject.text();
    populateAllGames(myText);
}

function populateAllGames(games) {
    const readableGames = JSON.parse(games);
    const numberOfGames = Object.keys(readableGames).length;
    const div = document.createElement("div");
    for (let i=0; i < numberOfGames; i++) {
        const gameContainer = document.createElement("div");
        const gameName = document.createElement("h2");
        const description = document.createElement("p");
        gameName.innerHTML = readableGames[i].game_name;
        description.innerHTML= readableGames[i].game_description;
        gameContainer.appendChild(gameName);
        gameContainer.appendChild(description);
        div.appendChild(gameContainer);
    }
    document.getElementById('gamesList').appendChild(div);

}
getAllGames();