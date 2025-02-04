import { db } from "../database/db-connection.js"

async function getRentals(){
    const answer = await db.query(`
        SELECT * FROM rentals;`)

    return answer;
}

async function getRentalById(id){
    const answer = await db.query(`
        SELECT * FROM rental WHERE id=$1;`, [id])
    
    return answer;
}


async function insertRental(customerId, gameId, daysRented){
    const pricePerDay = await db.query(`SELECT games.pricePerDay
         FROM games WHERE games.id=$1;`, [gameId]);

    const originalPrice = daysRented * pricePerDay;
    
    await db.query(
        ` INSERT INTO games (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee)
            VALUES ($1, $2, current_date, $3, $4, $5, $6);`, [customerId, gameId, daysRented, null, originalPrice, null]
    )


    return {
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee
    }

}

async function rentalReturn(id){
    
    const pricePerDay = await db.query(`SELECT games.pricePerDay
        FROM games WHERE games.id=$1;`, [gameId]);

    const today = await db.query(`SELECT CURRENT_DATE;`)
    const rentDate = await deb.query(`SELECT rentals.rentDate FROM rentals WHERE rentals.id=${id};`)
    

    const difference = today - rentDate;

    const delayFee = difference * pricePerDay;


    const answer = await db.query(
        `INSERT INTO rentals (returnDate, delayFee) VALUES (current_date, $2) WHERE id=$1;`,
        [id, delayFee]) 

}


async function deleteRental(id){
   await db.query(`DELETE * FROM rental WHERE id=$1;`, [id])
}

const rentalsRepository = {
    getRentals,
    getRentalById,
    insertRental,
    rentalReturn,
    deleteRental
}

export default rentalsRepository