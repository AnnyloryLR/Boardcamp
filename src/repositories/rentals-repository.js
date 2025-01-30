import { db } from "../database/db-connection.js"

async function getRentals(){
    const answer = await db.query(`
        SELECT * FROM rentals`)

    return answer;
}

async function getRentalById(id){
    const answer = await db.query(`
        SELECT * FROM rental WHERE id=$1`, [id])
}


async function insertRental(customerId, gameId, daysRented){
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

async function rentalReturn(id){
    const answer = await db.query(
        `INSERT INTO rentals ()  WHERE id=$1`,
        [id]
    )
//still not finished;   

}


async function deleteRental(id){
    const answer = await db.query(`
        DELETE * FROM rental WHERE id=$1`, [id])
}

const rentalsRepository = {
    getRentals,
    getRentalById,
    insertRental,
    rentalReturn,
    deleteRental
}

export default rentalsRepository