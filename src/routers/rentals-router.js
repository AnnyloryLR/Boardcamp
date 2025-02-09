import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware.js";
import { rentalsSchema } from "../schemas/rentals-schema.js";
import { deleteRental, getRentals, insertRental, rentalReturn } from "../controllers/rentals-controller.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", schemaValidate(rentalsSchema), insertRental);
rentalsRouter.post("/rentals/:id/return", rentalReturn);
rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;