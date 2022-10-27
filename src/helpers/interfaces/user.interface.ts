import { IGetOne, ICreate } from "./crud.interface";
export interface IUserRepository<TModel> extends IGetOne<TModel | null, number>, ICreate<TModel>{ }