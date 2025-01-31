import gamesRepository from "../repositories/games-repository.js";

async function getGames(){
    await gamesRepository.getGames()
}

async function insertGame({name, image, stockTotal, pricePerDay}){
    await gamesRepository.insertGame(name, image, stockTotal, pricePerDay)
}

const gamesService = {
    getGames,
    insertGame
}

export default gamesService




