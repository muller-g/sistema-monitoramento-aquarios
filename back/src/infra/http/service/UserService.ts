import User from "src/entity/User";
import { prisma } from "../../database/client";

export default class UserService {
    static async create(user: User | any){
        try {
            return await prisma.user.create({
                data: user
            });
        } catch (e: any){
            return e.message;
        }
    }

    static async update(user: User | any, user_id: string){
        try {
            const userUpdated: User | any = await prisma.user.update({
                where: {
                    id: user_id
                },
                data: user
            });

            if(!userUpdated){
                throw new Error('Usuário não existe');
            }

            return userUpdated
        } catch (e: any){
            return e.message;
        }
    }

    static async get(filter?: any){
        try {
            return await prisma.user.findMany(filter);
        } catch (e: any){
            return e.message;
        }
    }

    static async getById(id: string){
        try {
            const user: User | any = await prisma.user.findUnique({
                where: {
                    id: id
                }
            });

            if(!user){
                throw new Error('Usuário não existe');
            }

            return user
        } catch (e: any){
            return e.message;
        }
    }

    static async delete(id: string){
        try {
            const user: User | any = await prisma.user.delete({
                where: {
                    id: id
                }
            });

            if(!user){
                throw new Error('Usuário não existe');
            }

            return "Success"
        } catch (e: any){
            return e.message;
        }
    }
}