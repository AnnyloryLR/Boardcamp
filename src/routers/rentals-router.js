import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware.js";
import { rentalsSchema } from "../schemas/rentals-schema.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals");
rentalsRouter.post("/rentals", schemaValidate(rentalsSchema));
rentalsRouter.post("rentals/:id/return");
rentalsRouter.delete("/rentals/:id");

export default rentalsRouter;