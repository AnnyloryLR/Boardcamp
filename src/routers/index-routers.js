import { Router } from "express";
import customersRouter from "./customers-router.js";
import gamesRouter from "./games-router.js";
import rentalsRouter from "./rentals-router.js";

const routerIndex = Router();

routerIndex.use(customersRouter);
routerIndex.use(gamesRouter);
routerIndex.use(rentalsRouter);

export default routerIndex