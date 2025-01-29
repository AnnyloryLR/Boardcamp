import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware.js";
import 
    import { customersSchema } from "../schemas/customers-schema.js";


const customersRouter = Router();


customersRouter.get("/customers");
customersRouter.get("/customers/:id");
customersRouter.post("/customers", schemaValidate(customersSchema))

export default customersRouter;
