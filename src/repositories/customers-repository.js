import { db } from "../database/db-connection.js"

async function getCustomers(){
    const answer = await db.query(`
        SELECT * FROM customers`)

    return answer
}

async function getCustomerById(id){
    const answer = await db.query(`
        SELECT * FROM customers WHERE id=$1;`, [id])

    return answer
}

async function getCustomerByCpf(cpf){
    const answer =  await db.query(`SELECT * FROM customers WHERE cpf=$1`,
        [cpf]
    )

    return answer
}

async function insertCustomer(name, phone, cpf){
    await db.query(`
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
    getCustomerByCpf,
    insertCustomer
}

export default customersRepository