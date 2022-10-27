import { Router } from "express";
import shoppingController from "../controllers/shopping.controller";
const router :Router = Router();


router
    .route('/shop/add')
    .post(shoppingController.create);


router
    .route('/shop/get/:id')
    .get(shoppingController.getAll);


router
    .route('/shop/del')
    .delete(shoppingController.deleted);


router
    .route('/shop/clear')
    .delete(shoppingController.clearCookie);
export default router;