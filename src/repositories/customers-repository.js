import { db } from "../database/db-connection.js"

async function getCustomers(){
    const answer = await db.query(`
        SELECT * FROM customers`)
}

async function getCustomerById(id){
    const answer = await db.query(`
        SELECT * FROM customers WHERE id=$1;`, [id])
}

async function insertCustomer(name, phone, cpf){
    const answer = await db.query(`
        INSERT INTO customers (name, phone, cpf)
            VALUES ($1, $2, $3)`, [name, phone, cpf]
    )

    return {
        name,
        phone,
        cpf
    }
}

const customersRepository = {
    getCustomers,
    getCustomerById,
    insertCustomer
}

export default customersRepository