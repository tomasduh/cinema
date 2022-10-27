import { Request, Response } from "express";
import transactions_detailRepository from "../repository/transactions_detail.repository";
import { ITransactionDetailController } from "../helpers/interfaces/transaction_detail.interface";




class TransactionDetailController implements ITransactionDetailController
{
    async getOne(req: Request, res:Response): Promise<void> {
        const id = parseInt(req.params.id);
        const result : any = await transactions_detailRepository.get(id);
        res.json(result);
    }

    async getAll(req: Request, res:Response): Promise<void> {
        const result = await transactions_detailRepository.getAll();
        res.json(result)
    }

    async delete(req: Request, res:Response): Promise<void> {
        const id = req.body.id;
        const query = await transactions_detailRepository.deleted(id);
        res.json(query);
    }
    async create(req: Request, res:Response): Promise<void> {
        try{
            const data = req.body;
            const query = await transactions_detailRepository.create(data);
            res.json({code:400});
        }
        catch(error:any){
            res.json({code:200, error:error});
        }
    }
    async update(req: Request, res:Response): Promise<void> {
        try{
            const id = req.body.id;
            const data = req.body;
            const query = await transactions_detailRepository.update(id,data);
            res.json({code:400});
        }   
        catch(error:any){
            res.json({code:200,error:error});
        }
    }
}

export default new TransactionDetailController();