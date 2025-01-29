import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware.js";
import { gamesSchema } from "../schemas/games-schema.js";

const gamesRouter = Router();

gamesRouter.get("/games");
gamesRouter.post("/games", schemaValidate(gamesSchema));


export default gamesRouter;