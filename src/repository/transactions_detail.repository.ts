
import { ITransactionDetailRepository } from "../helpers/interfaces/transaction_detail.interface";
import { transaction_detail } from "@prisma/client";
import prisma from "../helpers/db/db";




class TransactionDetailRespository implements ITransactionDetailRepository<transaction_detail>{
    async getAll(): Promise<transaction_detail[]> {
        const data:any = await prisma.transaction_detail.findMany({        
            include:{
                movies:true,
                transactions:true
            }
        });
        return data;
    }

    async get(id: number): Promise<transaction_detail> {
        const order:any = await prisma.transaction_detail.findMany({
            where:{
                transaction_id:id
            },
            include:{
                movies:{
                    include: {
                        movies_categories: {
                            include: {
                                categories: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },
                transactions:true
            },
        });
        return order;
    }

    async create(data_order: transaction_detail): Promise<transaction_detail> {
        const order:any = await prisma.transaction_detail.create({
            data:data_order
        });
        return order;
    }
    async deleted(id: number): Promise<transaction_detail> {
        const query:any = await prisma.transaction_detail.delete({
            where:{
                id:id
            }
        });
        return query;
    }

    async update(id: number, data: transaction_detail): Promise<transaction_detail> {
        const query:any = await prisma.transaction_detail.update({
            where:{
                id:id
            },
            data:data
        })
        return query;
    }
}

export default new TransactionDetailRespository();