import gamesService from "../services/games-service.js";


export async function getGames( req, res){
    const answer = await gamesService.getGames();

    res.status(200).send(answer);
}

export async function insertGame( req, res){
    const answer = await gamesService.insertGame(req.body);

    res.status(201).send(answer);
}