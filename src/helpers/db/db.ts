import { IORM } from '../interfaces/db.interface';
import { PrismaClient  } from '@prisma/client'

class DBPrisma implements IORM<PrismaClient> {
    private _orm:PrismaClient = new PrismaClient();

    get orm():PrismaClient {
        return this._orm;
    }
}

const prisma = new DBPrisma().orm

export default prisma
