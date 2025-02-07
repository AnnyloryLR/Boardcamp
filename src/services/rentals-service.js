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
    
    const rentalExistent = await getRentalById(gameId);

    const existent = await getRentalById(customerId);
   
    if(rentalExistent) throw notFound(rentalExistent);
    
    if(existent) throw notFound(existent);

    //if(delayFee !== null) throw UnprocessableEntity;
    
    const answer = await rentalsRepository.insertRental(customerId, gameId, daysRented);      
    
}

async function rentalReturn(id) {

    // if(!id) throw notFound(id);

    // if(returnDate) throw UnprocessableEntity;

    answer = await rentalsRepository.rentalReturn(id)
    console.log(id)
    
}

async function deleteRental(id) {

    if(!id) throw notFound(id);

    //if(finished === null) throw badRequest;


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