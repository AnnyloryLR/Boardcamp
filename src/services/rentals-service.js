import { badRequest, notFound, UnprocessableEntity } from "../errors/errors.js";
import rentalsRepository from "../repositories/rentals-repository.js";

async function getRentals(){
    const answer =  await rentalsRepository.getRentals();

    return answer 
}

async function getRentalById(id){
    await rentalsRepository.getRentalById(id)

}

async function insertRental({customerId, gameId, daysRented}){
   
    const {existentGame} = await rentalsRepository.insertRental(customerId, gameId, daysRented);

    const {existentCustomer} = await rentalsRepository.insertRental(customerId, gameId, daysRented);
    
    const {delayFee} = await rentalsRepository.insertRental(customerId, gameId, daysRented); 

   
    if(existentGame.rowCount === 0 ) throw notFound(gameId);
    
    if(existentCustomer.rowCount === 0 ) throw notFound(customerId);

    if(delayFee !== null) throw UnprocessableEntity();
    
    await rentalsRepository.insertRental(customerId, gameId, daysRented); 

}

async function rentalReturn(id) {
    
    const existentId = await rentalsRepository.getRentalById(id);
   
    let returnDate = await rentalsRepository.getRentalById(id);
    returnDate = returnDate.rows[0].returnDate;
  
    if(existentId.rowCount === 0) throw notFound(id);

    if(returnDate) throw UnprocessableEntity();

    await rentalsRepository.rentalReturn(id);

}

async function deleteRental(id) {

    const existentId  = await rentalsRepository.getRentalById(id);
    let returnDate = await rentalsRepository.getRentalById(id);
    returnDate = returnDate.rows[0].returnDate

    if (existentId.rowCount === 0) throw notFound(id);

    if (returnDate === null) throw badRequest();


    await rentalsRepository.deleteRental(id);
    
}

const rentalsService = {
    getRentals,
    getRentalById,
    insertRental,
    rentalReturn,
    deleteRental
}

export default rentalsService