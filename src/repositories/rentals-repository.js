import { db } from "../database/db-connection.js"

async function getRentals(){
    const answer = await db.query(`
        SELECT * FROM rentals;`)
//not finished
    return answer.rows;
}

async function getRentalById(id){
    const answer = await db.query(`
        SELECT * FROM rentals WHERE id=$1;`, [id])
    
    return answer;
}


async function insertRental(customerId, gameId, daysRented){
    const pricePerDay = await db.query(`SELECT "pricePerDay"
         FROM games WHERE games.id=$1;`, [gameId]);

    const originalPriceCalculated= "1500"
        
    await db.query(
        `  INSERT INTO rentals ("customerId","gameId", "rentDate","daysRented","returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7);`,
             [customerId, gameId, daysRented, originalPriceCalculated]
    )

    return {
        customerId,
        gameId,
        daysRented,
        rentDate,
        returnDate,
        originalPrice:originalPriceCalculated,
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
        `INSERT INTO rentals (returnDate, delayFee) VALUES (current_date, $2) WHERE id=$1 RETURNING returnDate;`,
        [id, delayFee]) 

    return answer

}


async function deleteRental(id){
   const finished = await db.query(`SELECT rentals.returnDate FROM rentals WHERE id=$1`, [id])
   await db.query(`DELETE * FROM rental WHERE id=$1;`, [id]);

   return finished;
}

const rentalsRepository = {
    getRentals,
    getRentalById,
    insertRental,
    rentalReturn,
    deleteRental
}

export default rentalsRepository