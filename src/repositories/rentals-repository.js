import { db } from "../database/db-connection.js"
import dayjs from 'dayjs'

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

    const answer = await db.query(`SELECT "pricePerDay" FROM games WHERE games.id = $1`, [gameId]);


    const returnDate = null
    const originalPrice = daysRented * (answer.rows[0].pricePerDay)
    const delayFee = null
    const rentDate = dayjs().locale('br').format('YYYY/MM/DD')
        
    await db.query(
        `  INSERT INTO rentals ("customerId","gameId", "rentDate","daysRented","returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7 );`,[customerId, gameId, rentDate, daysRented, returnDate,
                originalPrice, delayFee]
    )


    return {
        customerId,
        gameId,
        daysRented,
        rentDate,
        returnDate,
        originalPrice,
        delayFee
    }

}

async function rentalReturn(id){
    
    // const pricePerDay = await db.query(`SELECT "pricePerDay"
    //     FROM games WHERE games.id=$1;`, [id]);

    // const returnDate = dayjs().locale('br').format('YYYY/MM/DD');

    // const rentDateSearch = await deb.query(`SELECT "rentDate" FROM rentals WHERE rentals.id=$1;`, [id])

    // const rentDate = rentDateSearch.rows[0].rentDate

    // const difference = returnDate - rentDate;

    // const delayFee = difference * pricePerDay;


    const answer = await db.query(
       `UPDATE rentals SET "returnDate"= current_date, "delayFee"=1500 WHERE id=$1;`, [id]);

    return answer

}


async function deleteRental(id){
  
   const answer = await db.query(`DELETE FROM rentals WHERE id=$1;`, [id]);

   return answer;
}

const rentalsRepository = {
    getRentals,
    getRentalById,
    insertRental,
    rentalReturn,
    deleteRental
}

export default rentalsRepository