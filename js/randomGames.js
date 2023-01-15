async function getRandomGame() {
    const game = await fetch("getRandomGame");
    const gameDataString = await game.text();
    populateRandomGame(gameDataString);
}

function populateRandomGame(game) {
    const readableGame = JSON.parse(game);
    document.getElementById("gameName").innerHTML = readableGame.game_name;
    document.getElementById("gameDescription").innerHTML = readableGame.game_description;
}
getRandomGame();