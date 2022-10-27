import { IController, ICreate, IDeleteOne, IGetAll, IGetOne, IUpdateOne } from "./crud.interface";
import { Request, Response } from "express";

export interface ITransactionController extends IController<Request, Response>{}

export interface ITransactionRepository<TModel> extends IGetAll<TModel>, IGetOne<TModel, number>, ICreate<TModel>, IDeleteOne<TModel, number>, IUpdateOne<TModel, number>{}
