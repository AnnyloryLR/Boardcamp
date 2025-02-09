import { db } from "../database/db-connection.js"
import dayjs from 'dayjs'
import { omit } from "underscore"

async function getRentals(){
    const answer = await db.query(
        `SELECT rentals.*, customers.id AS id2, customers.name AS name2, games.id AS id3, games.name AS name3 FROM rentals JOIN
         customers ON customers.id = "customerId" JOIN games ON games.id = "gameId";`)

    const rentals = answer.rows;

    const formattedRentals = rentals.map(rental => rental = {...rental, 
                            customer:{id: rental.id2, name:rental.name2},
                            game:{id: rental.id3, name:rental.name3} })

    const finalRentals =  formattedRentals.map(rental => rental = omit(rental, ['id2','id3', 'name2', 'name3']))
    

    return (finalRentals)
}

async function getRentalById(id){
    const answer = await db.query(`
        SELECT * FROM rentals WHERE id=$1;`, [id])
     
    return answer;
}


async function insertRental(customerId, gameId, daysRented){

    let existentCustomer = await db.query(`SELECT customers.id FROM customers WHERE customers.id=$1`, [customerId]);
    existentCustomer = existentCustomer.rowCount 

    let existentGame = await db.query(`SELECT games.id FROM games WHERE games.id=$1`, [gameId]);
    existentGame = existentGame.rowCount
    
    const pricePerDay = await db.query(`SELECT "pricePerDay" FROM games WHERE games.id = $1`, [gameId]);
    const returnDate = null
    const originalPrice = daysRented * (pricePerDay.rows[0].pricePerDay)
    const delayFee =1500
    const rentDate = dayjs().locale('br').format('YYYY/MM/DD')
        
    await db.query(
        `  INSERT INTO rentals ("customerId","gameId", "rentDate","daysRented","returnDate", "originalPrice", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7 );`,[customerId, gameId, rentDate, daysRented, returnDate,
                originalPrice, delayFee]
    )


    return {
        existentCustomer,
        existentGame,
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

    let gameId = await db.query(`SELECT "gameId" FROM rentals WHERE rentals.id = $1`, [id]);
    gameId = gameId.rows[0].gameId;
    
    let pricePerDay = await db.query(`SELECT "pricePerDay"
         FROM games WHERE games.id=$1;`, [gameId]);
    pricePerDay = pricePerDay.rows[0].pricePerDay;

    const returnDate = dayjs().locale('br').format('YYYY/MM/DD');

    const rentDateSearch = await db.query(`SELECT "rentDate" FROM rentals WHERE rentals.id=$1;`, [id])

    let  rentDate = rentDateSearch.rows[0].rentDate;
    rentDate = (dayjs(rentDate).locale('br').format('YYYY/MM/DD'))

    const difference = (dayjs(returnDate).diff(rentDate)) / (1000 * 60 * 60 * 24);

    const delayFee = difference * pricePerDay;

   
    const answer = await db.query(
       `UPDATE rentals SET "returnDate"= current_date, "delayFee"=$2 WHERE id=$1;`, [id, delayFee]);

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