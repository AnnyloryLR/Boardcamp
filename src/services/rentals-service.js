import { badRequest, notFound, UnprocessableEntity } from "../errors/errors.js";
import customersRepository from "../repositories/customers-repository.js";
import gamesRepository from "../repositories/games-repository.js";
import rentalsRepository from "../repositories/rentals-repository.js";

async function getRentals(){
    const answer =  await rentalsRepository.getRentals();

    return answer 
}

async function getRentalById(id){
    const answer = await rentalsRepository.getRentalById(id)

    return answer.rows

}

async function insertRental({customerId, gameId, daysRented}){
   
    const existentGame= await gamesRepository.getGameById(gameId);

    if(existentGame.rowCount === 0 ) throw notFound(gameId);

    const existentCustomer = await customersRepository.getCustomerById(customerId);            
    
    if(existentCustomer.rowCount === 0 ) throw notFound(customerId);
    
    const orginalStock = existentGame.rows[0].stockTotal

    const rentedGame = await rentalsRepository.getRentedGame(gameId)

    if(orginalStock === rentedGame) throw UnprocessableEntity()
    
    await rentalsRepository.insertRental( customerId, gameId, daysRented); 
}

async function rentalReturn(id) {
    
    const existentId = await rentalsRepository.getRentalById(id);
   
    let returnDate = await rentalsRepository.getRentalById(id);
  
    if(existentId.rowCount === 0) throw notFound(id);

    if(returnDate.rowCount !== 0) throw UnprocessableEntity();

    await rentalsRepository.rentalReturn(id);

}

async function deleteRental(id) {

    const existentId  = await rentalsRepository.getRentalById(id);
   
    if (existentId.rowCount === 0) throw notFound(id);

    let returnDate = await rentalsRepository.getRentalById(id);

    returnDate = returnDate.rows[0].returnDate

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