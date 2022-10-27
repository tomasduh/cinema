import { Router } from "express";
import transactionController from "../controllers/transaction.controller";
import transaction_detailController from "../controllers/transaction_detail.controller";
const router:Router = Router();

// Detail order routes
router
    .route('/history/order/:id')
    .get(transaction_detailController.getOne);
router
    .route('/history')
    .get(transactionController.getAll)

router
    .route('/history/order/create')
    .post(transaction_detailController.create);

// Transaction routes
router
    .route('/history/:id')
    .get(transactionController.getOne);

router
    .route('/history/create')
    .post(transactionController.create);

router
    .route('/history/update')
    .patch(transactionController.update);

    
export default router