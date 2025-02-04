import { badRequest, notFound, UnprocessableEntity } from "../errors/errors.js";
import rentalsRepository from "../repositories/rentals-repository.js";

async function getRentals(){
    await rentalsRepository.getRentals()

}

async function getRentalById(id){
    await rentalsRepository.getRentalById(id)

}

async function insertRental({customerId, gameId, rentDate, daysRented, returnDate, originalPrice,
    delayFee}){
    
    const gameExistent = getRentalById(gameId);
    const existent = getRentalById(customerId);
   
    if(gameExistent) throw notFound(gameExistent);
    
    if(existent) throw notFound(existent);

    if(delayFee !== null) throw UnprocessableEntity;
    
    await rentalsRepository.insertRental(customerId, gameId, rentDate, daysRented, returnDate, originalPrice,
        delayFee)
    
}

async function rentalReturn(id, {returnDate}) {

    if(!id) throw notFound(id);

    if(returnDate) throw UnprocessableEntity;

    await rentalsRepository.rentalReturn(id)
    
}

async function deleteRental(id, {finished}) {

    if(!id) throw notFound(id);

    if(finished === null) throw badRequest;


    await rentalsRepository.deleteRental(id)
    
}

const rentalsService = {
    getRentals,
    getRentalById,
    insertRental,
    rentalReturn,
    deleteRental
}

export default rentalsService