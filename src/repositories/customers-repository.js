import { db } from "../database/db-connection.js"

export async function getCustomers(){
    const answer = await db.query(`
        SELECT * FROM customers`)
}

export async function getCustomerById(id){
    const answer = await db.query(`
        SELECT * FROM customers WHERE id=$1;`, [id])
}

export async function insertCustomer(name, phone, cpf){
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