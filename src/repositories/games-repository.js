import { db } from "../database/db-connection.js";

async function getGames(){
    const answer = await db.query(
        `SELECT * FROM games;`)   

    return answer.rows
}

async function getGameByName(name){
     const conflict= await db.query(`SELECT games.name FROM games WHERE games.name = $1;`, [name]);
     
     return conflict
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
    insertGame
}

export default gamesRepository