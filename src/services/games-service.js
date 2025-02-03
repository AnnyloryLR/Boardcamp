import gamesRepository from "../repositories/games-repository.js";
import { conflictError } from "../errors/errors.js";

async function getGames(){
    const answer = await gamesRepository.getGames();
    return answer
}

async function insertGame({name, image, stockTotal, pricePerDay}){
    const conflict = gamesRepository.getGamesByName();
    
    if(conflict) throw conflictError(name);    
    
    await gamesRepository.insertGame(name, image, stockTotal, pricePerDay)
}

const gamesService = {
    getGames,
    insertGame
}

export default gamesService




