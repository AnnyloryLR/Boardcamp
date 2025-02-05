import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware.js";
import { customersSchema } from "../schemas/customers-schema.js";
import { getCustomers, getCustomersById, insertCustomer } from "../controllers/customers-controller.js";


const customersRouter = Router();


customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomersById);
customersRouter.post("/customers", schemaValidate(customersSchema), insertCustomer);

export default customersRouter;
