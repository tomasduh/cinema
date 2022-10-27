import { Router} from "express";
import MoviesController from "../controllers/movie.controller";
import ViewController from "../controllers/ViewController";


const router : Router = Router();

router
    .route('/movies')
    .get(ViewController.getAll)

router
    .route('/movies/search')
    .get(MoviesController.getAllBySearch)

    
    router
    .route('/movies/category')
    .get(MoviesController.getAllByCategory)
    
router
    .route('/movies/:id')
    .get(MoviesController.get)


export default router