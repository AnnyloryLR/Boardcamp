import gamesRepository from "../repositories/games-repository.js";

async function getGames(){
    const answer = await gamesRepository.getGames();
    return answer
}

async function insertGame({name, image, stockTotal, pricePerDay}){
    
    
    
    
    await gamesRepository.insertGame(name, image, stockTotal, pricePerDay)
}

const gamesService = {
    getGames,
    insertGame
}

export default gamesService




