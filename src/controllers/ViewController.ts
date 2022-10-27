import MoviesRepository from "../repository/movies.repository";
import { IController } from "../helpers/interfaces/crud.interface";
import { Request, Response } from "express";
import UserRepository from "../repository/users.repository";
import transactionRepository from "../repository/transaction.repository";
import transactions_detailRepository from "../repository/transactions_detail.repository";
import ActorsRepository from "../repository/actors.repository";
import { objectEnumValues } from "@prisma/client/runtime";

class ViewController implements IController<Request, Response>{

    renderLogin(req: Request, res: Response) {
        const user = req.user
        res.render('layouts/login', {path:req.originalUrl, user:user})
    }

    renderRegister(req: Request, res: Response) {
        const user = req.user
        res.render('layouts/register', {path:req.originalUrl, user:user})
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user
            const id = 0;
            const movies: any = await MoviesRepository.getAll();
            const categories = await MoviesRepository.getAllCategoriesFirtsFive();
            const categoriesSelect = await MoviesRepository.getAllCategoriesSelect();
            movies[1].forEach((element: any, index: any) => {
                const genres: any = []
                element.movies_categories.forEach((genre: any) => {
                    genres.push(genre.categories.name)
                })
                element.movies_categories = genres
            })
            res.render('layouts/shop', { paginate: 1, result: movies[1], count: movies[0], id: id, categories: categories, categoriesSelect: categoriesSelect, user: user, path: req.originalUrl });
        } catch (error) {
            res.render('layouts/error', { error: error })
        }
    }

    async getAllByCategoryId(req: Request, res: Response): Promise<void> {
        try {
            let category: any = req.query.category
            const pag = req.params.pag;
            category = parseInt(category)
            const user = req.user
            const movies: any = await MoviesRepository.getAllByCategoryById(category, pag);
            const categories = await MoviesRepository.getAllCategoriesFirtsFive();
            const categoriesSelect = await MoviesRepository.getAllCategoriesSelect();
            const id: Array<any> = [movies[3], false];
            res.render('layouts/shop', { paginate: movies[2], result: movies[1], count: movies[0], categories: categories, categoriesSelect: categoriesSelect, id, user: user, path: req.originalUrl});
        } catch (error) {
            res.render('layouts/error', { error: error })
        }
    }

    async getPaginate(req: Request, res: Response): Promise<void> {
        try {
            const pag = req.params.pag;
            const user = req.user;
            const movies = await MoviesRepository.getPaginated(pag);
            const categories = await MoviesRepository.getAllCategoriesFirtsFive();
            const categoriesSelect = await MoviesRepository.getAllCategoriesSelect();
            movies[1].forEach((element: any, index: any) => {
                const genres: any = []
                element.movies_categories.forEach((genre: any) => {
                    genres.push(genre.categories.name)
                })
                element.movies_categories = genres
            })
            res.render('layouts/shop', { paginate: movies[2], result: movies[1], count: movies[0], categories: categories, categoriesSelect: categoriesSelect, id: 0, user: user, path: req.originalUrl });
        } catch (error) {
            res.render('layouts/error', { error: error })
        }
    }

    async getAllBySearch(req: Request, res: Response): Promise<void> {
        try {
            const search = req.query.search
            const pag = req.params.pag;
            const user = req.user;
            const movies: any = await MoviesRepository.getAllBySearch(search, pag);
            const categories = await MoviesRepository.getAllCategoriesFirtsFive();
            const categoriesSelect = await MoviesRepository.getAllCategoriesSelect();
            const id: Array<any> = [search, true];
            movies[1].forEach((element: any, index: any) => {
                const genres: any = []
                element.movies_categories.forEach((genre: any) => {
                    genres.push(genre.categories.name)
                })
                element.movies_categories = genres
            })
            res.render('layouts/shop', { paginate: movies[2], result: movies[1], count: movies[0], categories: categories, categoriesSelect: categoriesSelect, id, user: user, path: req.originalUrl, });
        } catch (error) {
            res.render('layouts/error', { error: error })
        }

    }

    async movieDetail(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user
            const id = parseInt(req.params.id)
            const movie : any = await MoviesRepository.get(id)
            const actors = await ActorsRepository.getAll(id)
            const title : string = movie.title.split(" ");
            const word : string = title[0]
            const category = movie.movies_categories[0].categories.name
            const moviesRecommended = await MoviesRepository.getMoviesRecommended(id, category, word)

            res.render('layouts/movie-detail.ejs', { detalle: movie, actors: actors, moviesRecommended: moviesRecommended, id: id, path: req.originalUrl, user });
        } catch (error) {
            res.render('layouts/error', { error: error })
        }
    }

    async createTransaction(req: Request, res: Response): Promise<void> {
        const { ides }: any = req.query;
        const arrId: [] = ides.split(',')
        try {
            if (req.user.id) {
                const id = req.user.id;
                const user = await UserRepository.get(id);
                const current_date = new Date();
                const data: any = {
                    user_id: id,
                    create_date: current_date,
                    expiration_date: new Date(current_date.getTime() + (10 * 24 * 60 * 60 * 1000)),
                    status: true
                }
                await transactionRepository.create(data);
                const transactions: any = await transactionRepository.get(id);
                const transLength: number = transactions.length;
                const transId: number = transactions[transLength - 1].id;
                arrId.forEach(async (id: any) => {
                    const data: any = {
                        movie_id: parseInt(id),
                        transaction_id: transId,
                        quantity: 1
                    }
                    const result = await transactions_detailRepository.create(data);
                })
                res.cookie('shop', []);
                res.redirect('/history')
                return
            }
            res.redirect('/login')
        } catch (error: any) {
            res.render('layouts/error', { error: error })
        }
    }

    async createTransactionDetail(req: Request, res: Response, id: any,): Promise<void> {
        try {
            const data = req.body;
            const query = await transactions_detailRepository.create(data);
            res.json({ code: 400 });
        }
        catch (error: any) {
            res.json({ code: 200, error: error });
        }
    }

    async getHistory(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user
            const { id } = req.user;
            const result: any = await transactionRepository.get(id);
            result.forEach((element: any) => {
                element.create_date = new Date(element.create_date).toLocaleString();
            })
            res.render('layouts/history_order.ejs', {
                result: result,
                path: req.originalUrl,
                user
            })
        } catch (error) {
            res.render('layouts/error', { error: error })
        }
    }

    async getOrderDetail(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const user = req.user
            const result: any = await transactions_detailRepository.get(id);
            result.forEach((element: any) => {
                element.transactions.create_date = new Date(element.transactions.create_date).toLocaleString();
            })
            res.render('layouts/orderDetail', {
                products: result,
                path: req.originalUrl,
                user
            })
        } catch (error) {
            res.render('layouts/error', { error: error })
        }
    }
}

export default new ViewController();