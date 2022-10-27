import actorsRepository from "../repository/actors.repository";
import { Request, Response } from "express";
class ActorsController
{
    async getAll(req:Request, res:Response)
    {   
        const id = parseInt(req.params.id)
        const actors = await actorsRepository.getAll(id);
        res.json(actors);
    }
}

export default new ActorsController();