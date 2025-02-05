import { Router } from "express";
import { schemaValidate } from "../middlewares/schema-middleware.js";
import { gamesSchema } from "../schemas/games-schema.js";
import { getGames, insertGame } from "../controllers/games-controller.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", schemaValidate(gamesSchema), insertGame);


export default gamesRouter;