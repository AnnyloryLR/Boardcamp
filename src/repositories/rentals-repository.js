import { db } from "../database/db-connection.js"

export async function getRentals(){
    const answer = await db.query(`
        SELECT * FROM rentals`)

    return answer;
}

export async function getRentalById(id){
    const answer = await db.query(`
        SELECT * FROM rental WHERE id=$1`, [id])
}


export async function insertRental(customerId, gameId, daysRented){
    const answer = await db.query(
        ` INSERT INTO games (customerId, gameId, daysRented)
            VALUES ($1, $2, $3, $4)`, [customerId, gameId, daysRented]
    )

    return {
        customerId,
        gameId,
        daysRented
    }

}

export async function finishRental(xxx){
    const answer = await db.query(
        ``
    )

    return {
        customerId,
        gameId,
        daysRented
    }

}


export async function deleteRental(id){
    const answer = await db.query(`
        DELETE * FROM rental WHERE id=$1`, [id])
}