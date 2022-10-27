import { credits, movies , users} from "@prisma/client"
import prisma from "../helpers/db/db"
class ActorsRepository
{

 async getAll(id:number)
 {
    const actors = await prisma.movies.findMany({
        where:{
            id: id
        },
       include:{
        credits:{
            include:{
                actors:{
                    select:{
                        name:true,
                        profile_path:true
                    }
                }
            }
        }
       }
    })
    return actors;
 }   

}

export default new ActorsRepository();