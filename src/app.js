import express, {json} from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

import customersRouter from './routers/customers-router.js';
import rentalsRouter from './routers/rentals-router.js';
import gamesRouter from './routers/games-router.js';

app.use(cors());
app.use(json());

app.use(customersRouter);
app.use(rentalsRouter);
app.use(gamesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running server on port ${port}`))