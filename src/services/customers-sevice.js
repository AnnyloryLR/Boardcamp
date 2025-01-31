import customersRepository from "../repositories/customers-repository.js";

async function getCustomers(){
    await customersRepository.getCustomers()
    
}

async function getCustomerById(id){
    await customersRepository.getCustomerById(id)

}

async function insertCustomer({name, phone, cpf}){
    await customersRepository.insertCustomer(name, phone, cpf)

}

const customersService = {
    getCustomers,
    getCustomerById,
    insertCustomer
}

export default customersService