import express, {json} from 'express';
import "express-async-errors";
import cors from 'cors';
import routerIndex from './routers/index-routers.js';
import errorHandler from './middlewares/errorHandler-middleware.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(routerIndex);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running server on port ${port}`))