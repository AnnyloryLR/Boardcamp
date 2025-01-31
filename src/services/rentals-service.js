import rentalsRepository from "../repositories/rentals-repository.js";

async function getRentals(){
    await rentalsRepository.getRentals()

}

async function getRentalById(id){
    await rentalsRepository.getRentalById(id)

}

async function insertRental({customerId, gameId, daysRented}){
    await rentalsRepository.insertRental(customerId, gameId, daysRented)
    
}

async function rentalReturn(id) {
    await rentalsRepository.rentalReturn(id)
    
}

async function deleteRental(id) {
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