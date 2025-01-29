import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    connection: process.env.DATABASE_URL
}

export const db = new Pool(databaseConfig);