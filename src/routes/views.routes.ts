import { Router } from "express";
import viewController from "../controllers/ViewController";
import tokenAuthentication from "../helpers/middlewares/tokenAuthentication";

const router: Router = Router();

router
    .get('/', (req: any, res: any) => {
        res.redirect('/movies')
    })
    .get('/movies', tokenAuthentication, viewController.getAll)
    .get('/movies/paginate/:pag', tokenAuthentication, viewController.getPaginate)
    .get('/movies/detail/:id', tokenAuthentication, viewController.movieDetail)
    .get('/movies/category/:pag', tokenAuthentication, viewController.getAllByCategoryId)
    .get('/movies/search/:pag', tokenAuthentication, viewController.getAllBySearch)
    .get('/history',  tokenAuthentication, viewController.getHistory)
    .get('/history/store',  tokenAuthentication, viewController.createTransaction)
    .get('/history/order/store',  tokenAuthentication, viewController.createTransactionDetail)
    .get('/history/order/:id',  tokenAuthentication, viewController.getOrderDetail)
    .get('/login', tokenAuthentication, viewController.renderLogin)
    .get('/register', tokenAuthentication, viewController.renderRegister)

export default router;