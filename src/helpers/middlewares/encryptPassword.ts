import prisma from "../db/db";
import bcrypt from "bcrypt";

prisma.$use(async (params: any, next: any)=>{
    if(params.model === 'users' && params.action === 'create'){
        const password = params.args.data.password;
        const passwordEncrypt = bcrypt.hashSync(password, 10);
        params.args.data.password = passwordEncrypt;
    }
    return await next(params)
})