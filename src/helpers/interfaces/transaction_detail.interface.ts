import { IController, ICreate, IDeleteOne, IGetAll, IGetOne, IUpdateOne } from "./crud.interface";
import { Request, Response } from "express";



export interface ITransactionDetailController extends IController<Request, Response>{}

export interface ITransactionDetailRepository<TModel> extends IGetAll<TModel>, IGetOne<TModel, number>, ICreate<TModel>, IDeleteOne<TModel, number>, IUpdateOne<TModel, number>{}

