import prisma from "../helpers/db/db";
import { IMovieRepository } from "../helpers/interfaces/movie.interface";
import { movies, Prisma } from "@prisma/client"
class MoviesRepository implements IMovieRepository<movies> {

    async getAll(): Promise<movies[]> {
        const count = await prisma.movies.count();
        const data: any = await prisma.movies.findMany({
            skip: 0,
            take: 12,
            include: {
                movies_categories: {
                    select: {
                        categories: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return [count, data];
    }

    async getPaginated(pagination: string): Promise<any> {
        let page = parseInt(pagination);
        let skip = 11;
        if (page <= 1){
            skip = 0
        }
        if(page>2){
            skip *= page;
        }
        const count = await prisma.movies.count();
        const data: any = await prisma.movies.findMany({
            skip: skip,
            take: 12,
            include: {
                movies_categories: {
                    select: {
                        categories: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return [count, data, page];
    }

    async get(id: number): Promise<movies | null> {
        
        const data = await prisma.movies.findUnique({
            where: {
                id: id
            },
            include: {
                movies_categories: {
                    select: {
                        categories: {
                            select: {
                                name: true
                            }
                        }
                    }
                }, languages: {
                    select:{
                        name:true
                    }
                }
            }
        })

        return data
    }


    async update(id: number, dataToUpdate: movies): Promise<movies> {
        const data: any = await prisma.movies.update({
            where: {
                id: id
            },
            data: dataToUpdate
        })

        return data
    }

    async deleted(id: number): Promise<movies> {
        const data: any = await prisma.movies.delete({
            where: {
                id: id
            }
        })

        return data
    }

    async create(data: movies): Promise<movies> {
        const { title, overview, poster_path, release_date, popularity, vote_average, vote_count, adult, language_id, runtime, video_key } = data;
        const movie: any = await prisma.movies.create({
            data: {
                title,
                overview,
                poster_path,
                release_date,
                popularity,
                vote_average,
                vote_count,
                adult,
                language_id,
                runtime,
                video_key
            }
        });



        return movie;
    }

    async getAllByCategoryById(id: number,pagination: string): Promise<any> {
        let page = parseInt(pagination);
        let skip = 11;
        if (page <= 1){
            skip = 0
        }
        if(page>2){
            skip *= page;
        }
        const movies: any = await prisma.movies_categories.findMany({
            skip: skip,
            take: 12,
            where: {
                category_id: id
            },
            include: {
                categories: true,
                movies: true
            }
        });
        //saber cuantas peliculas tengo que listar
        const count: any = await prisma.movies_categories.count({
            where: {
                category_id: id
            }
        });

        return [count, movies, page, id];
    }

    async getMoviesRecommended(id: number, genre : string, word: string): Promise<any> {
        const title = `%${word}%`
        
        let sql = Prisma.sql`SELECT * FROM movies WHERE id != ${id} AND title LIKE ${title} LIMIT 8`
        let movies : any =  await prisma.$queryRaw`${sql}`

        if (Array.isArray(movies) && movies.length == 0){
            sql = Prisma.sql`
            SELECT m.*, c.name AS category FROM movies AS m
            JOIN movies_categories AS mc
            ON mc.movie_id = m.id
            JOIN categories AS c
            ON c.id = mc.category_id
            WHERE m.id != ${id} AND c.name = ${genre}
            LIMIT 8`
        }
        movies = await prisma.$queryRaw`${sql}`
        return movies
    }

    async getAllCategoriesFirtsFive(): Promise<any> {
        const movies: any = await prisma.categories.findMany({
            take: 5
        });
        return movies
    }

    async getAllCategoriesSelect(): Promise<void> {
        const movies: any = await prisma.categories.findMany({
            skip: 5
        });
        return movies
    }

    async getAllBySearch(name: any,pagination: string):  Promise<movies[]> {
        let page = parseInt(pagination);
        let skip = 11;
        if (page <= 1){
            skip = 0
        }
        if(page>2){
            skip *= page;
        }
        const count = await prisma.movies.count({
            where: {
                title: {
                    contains: name
                }
            }
        });
        
        const movies: any = await prisma.movies.findMany({
            skip: skip,
            take: 12,
            include: {
                movies_categories: {
                    select: {
                        categories: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            },
            where: {
                title: {
                    contains: name
                }
            },
        });
        return [count, movies, page];
    }
}

export default new MoviesRepository();