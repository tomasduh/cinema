import { Router } from "express";
import LoginController from "../controllers/login.controller";

const router:Router = Router();

router
    .route('/validate')
    .post(LoginController.validateSignIn)

router
    .route('/login')
    .post(LoginController.signIn)

router
    .route('/register')
    .post(LoginController.signUp)

router
    .route('/logout')
    .post(LoginController.logOut)

export default router;