import rentalsService from "../services/rentals-service.js";


export async function getRentals( req, res){
    const answer = await rentalsService.getRentals();

    res.status(200).send(answer);    
}

export async function getRentalById( req, res){
    const {id} = req.params;

    const answer = await rentalsService.getRentalById(id);
    

    res.status(200).send(answer);
}

export async function insertRental( req, res){
    const answer = await rentalsService.insertRental(req.body);

    res.status(201).send(answer);
}

export async function rentalReturn( req, res){
    const { id } = req.params;

    const answer = await rentalsService.rentalReturn(id);

    res.status(200).send(answer);
}

export async function deleteRental( req, res){
    const { id } = req.params;

    const answer = await rentalsService.deleteRental(id);

    res.status(204).send(answer);
}