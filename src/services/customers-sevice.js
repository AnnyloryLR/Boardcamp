import { conflictError, notFound } from "../errors/errors.js";
import customersRepository from "../repositories/customers-repository.js";

async function getCustomers(){
    const answer = await customersRepository.getCustomers();

    return answer
}

async function getCustomerById(id){
    const answer = await customersRepository.getCustomerById(id);
   
    if (answer.rowCount === 0) throw notFound(id);

    return answer.rows 
}

async function insertCustomer({name, phone, cpf}){
    const conflict = await customersRepository.getCustomerByCpf(cpf);

    if(conflict.rowCount !== 0) throw conflictError(cpf);
    
    await customersRepository.insertCustomer(name, phone, cpf);
}

const customersService = {
    getCustomers,
    getCustomerById,
    insertCustomer
}

export default customersService