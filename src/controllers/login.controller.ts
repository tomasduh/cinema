import { Request, Response } from "express";
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt from "bcrypt";
import config from "../config";
import { IController } from "../helpers/interfaces/crud.interface"
import usersRepository from "../repository/users.repository"
import cookieParser from "cookie-parser";


class LoginController implements IController<Request, Response> {
    
    
    async validateSignIn(req: Request, res: Response): Promise<void> {
        const {email, password} = req.body
        const user = await usersRepository.getEmail(email);
        if(!user) {
            res.json({email: 'Invalid email'})
            // res.redirect('login')
            return
        }
        const result = await bcrypt.compare(password, user.password);
        if(!result){
            res.json({password: 'Invalid password'})
            // res.redirect('login')
            return 
        }
        res.json({user: user})
    }

    signIn(req: Request, res: Response){
        const {user} = req.body;
        const tokenJwt = jwt.sign({user:user}, config.SECRET as Secret);
        res.cookie('auth', tokenJwt, {
            httpOnly: true,
            expires: new Date(Date.now()+999999999999)
        });
        res.json({msg: 'success'});
    }

    async signUp(req: Request, res: Response): Promise<void>  {
        const {id, name, email, password} = req.body
        const data = await usersRepository.create({id, name, email, password})
        res.json({code:200, data:data});
    }

    async logOut(req: Request, res: Response): Promise<void>{
        res.clearCookie('auth')
        res.send('cookie borrada')
    }
}

export default new LoginController()