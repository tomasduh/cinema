import { IGetAll, IGetOne, ICreate, IController, IDeleteOne, IUpdateOne } from './crud.interface';

export interface IMovieModel {
    id: number,
    title: string,
    overview: string,
    posterPath: string,
    relaseDate: Date,
    popularity: number,
    voteAverage: number,
    voteCount: number,
    isForAdults: boolean,
    language: string,
    runtime: number,
    videoKey: string,
}

export interface IMovieRepository<TModel> extends IGetAll<TModel>, IGetOne<TModel | null, number>, ICreate<TModel>, IDeleteOne<TModel, number>, IUpdateOne<TModel, number> { }

export interface IMovieController extends IController<Request, Response> { }





