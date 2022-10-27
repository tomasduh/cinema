import prisma from "../helpers/db/db";
import { ITransactionRepository } from "../helpers/interfaces/transaction.interface";
import { transactions } from "@prisma/client";

class TransactionRepository implements ITransactionRepository<transactions>{
    async getAll(): Promise<transactions[]> {
        let data:any = await prisma.transactions.findMany({
            include:{
                transaction_detail:true
            }
        });
        return data;
    }

    async get(id: number): Promise<transactions> {
        let data:any = await prisma.transactions.findMany({
            where:{
                user_id:id
            },
            include:{
                users:true,
                transaction_detail:true
            }
        });
        return data;
    }
    async create(data_transaction: transactions): Promise<transactions>{
        let transaction:any = await prisma.transactions.create({
            data:data_transaction
        });
        return transaction;
    }
    async deleted(id:number): Promise<transactions>{
        const data:any = await prisma.transactions.delete({
            where:{
                id:id,
            },
        })
        return data;
    }

    async update(id:number, data:transactions): Promise<transactions>{
        const dataToUpdate:any = await prisma.transactions.update({
            where:{
                id:id
            },
            data:data
        })
        return dataToUpdate;
    }




    
}

export default new TransactionRepository();