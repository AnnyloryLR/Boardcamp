import { db } from "../database/db-connection.js";

async function getGames(){
    const answer = await db.query(
        `SELECT * FROM games;`
    )
    return answer;
}

async function getGamesByName(name){
    const answer = await db.query(`
        SELECT * FROM games WHERE games.name=$1;`, [name])
    
    return answer
}

async function insertGame(name, image, stockTotal, pricePerDay){
    const answer = await db.query(
        ` INSERT INTO games (name, image, stockTotal, pricePerDay)
            VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]
    )

    return {
        name,
        image, 
        stockTotal,
        pricePerDay
    }
}

const gamesRepository = {
    getGames,
    getGamesByName,
    insertGame
}

export default gamesRepository