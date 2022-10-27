import { Router } from "express";
import actorsController from "../controllers/actors.controller";


const router:Router = Router();

router
    .route('/actors/:id')
    .get(actorsController.getAll);


export default router;