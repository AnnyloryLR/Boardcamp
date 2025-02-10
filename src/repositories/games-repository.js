import { db } from "../database/db-connection.js";

async function getGames(){
    const answer = await db.query(
        `SELECT * FROM games;`)   

    return answer.rows
}

async function getGameByName(name){
     const answer= await db.query(`SELECT games.name FROM games WHERE games.name = $1;`, [name]);
     
     return answer
}

async function getGameById(id){
    const answer= await db.query(`SELECT * FROM games WHERE games.id = $1;`, [id]);
    
    return answer
}

async function insertGame(name, image, stockTotal, pricePerDay){
    
    await db.query(` INSERT INTO games (name, image, "stockTotal", "pricePerDay")
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
    getGameByName,
    getGameById,
    insertGame
}

export default gamesRepository