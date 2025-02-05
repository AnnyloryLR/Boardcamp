import customersService from "../services/customers-sevice";


export async function getCustomers( req, res){
    const answer = await customersService.getCustomers();

    res.status(200).send(answer);
}

export async function getCustomersById( req, res){
    const {id} = req.params;

    const answer = customersService.getCustomerById(id);

    res.status(200).send(answer);
}

export async function insertCustomer( req, res){
    const answer = await customersService.insertCustomer(req.body);

    res.status(201).send(answer);
}