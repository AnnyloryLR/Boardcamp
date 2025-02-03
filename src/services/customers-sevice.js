import { conflictError } from "../errors/errors.js";
import customersRepository from "../repositories/customers-repository.js";

async function getCustomers(){
    const answer = await customersRepository.getCustomers();
    return answer
    
}

async function getCustomerById(id){
    const answer = await customersRepository.getCustomerById(id);
    return answer

}

async function insertCustomer({name, phone, cpf}){
    const conflict = customersRepository.getCustomerByCpf(cpf);

    if(conflict) throw conflictError(cpf);
    
    await customersRepository.insertCustomer(name, phone, cpf);

}

const customersService = {
    getCustomers,
    getCustomerById,
    insertCustomer
}

export default customersService