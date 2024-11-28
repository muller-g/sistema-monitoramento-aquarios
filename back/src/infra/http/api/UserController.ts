import bcrypt from "bcrypt";
import { Request, Response } from 'express';
import User from '../../../entity/User';
import logger from '../../../service/WinstonLogger';
import app from '../../server';
import UserService from '../service/UserService';
import EnsureUserToken from "../middleware/EnsureUserToken";

export default class UserController {
    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        logger.info("User routes start");

        app.post("/api/users", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const { name, email, user_class, password, course, role } = req.body;
                const user: User = await User.createUser(
                    name,
                    email,
                    user_class,
                    password,
                    course,
                    role
                );
    
                return res.status(200).json(await UserService.create(user));
            } catch(e){
                return res.status(500).json("Error");
            }
        });

        app.get("/api/users", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                let params: any = req.query;
                let filterParams: any = { 
                    where: {},
                    take: 25,
                    skip: 0
                };

                if(params.page) {
                    filterParams.skip = parseInt(params.page) 
                }

                if(params.name) {
                    filterParams.where.name = {
                        contains: params.name,
                        mode: 'insensitive'
                    };
                }
                
                if(params.email) {
                    filterParams.where.email = {
                        contains: params.email,
                        mode: 'insensitive'
                    };
                }
                
                if(params.class) {
                    filterParams.where.class = {
                        contains: params.class,
                        mode: 'insensitive'
                    };
                }
                
                if(params.course) {
                    filterParams.where.course = {
                        contains: params.course,
                        mode: 'insensitive'
                    };
                }
                
                if(params.role) {
                    filterParams.where.role = {
                        equals: params.role
                    };
                }                

                return res.status(200).json(await UserService.get(filterParams));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.get("/api/users/:id", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const user_id: string = req.params.id;
                return res.status(200).json(await UserService.getById(user_id));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.delete("/api/users/:id", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const user_id: string = req.params.id;
                return res.status(200).json(await UserService.delete(user_id));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });

        app.put("/api/users/:id", EnsureUserToken.validate, async (req: Request, res: Response) => {
            try {
                const user_id: string = req.params.id;
                const { name, user_class, password, course, role } = req.body;
                let userUpdate: any = {};

                if(name) userUpdate.name = name
                if(user_class) userUpdate.user_class = user_class
                if(password) userUpdate.password = await bcrypt.hash(password, 8)
                if(course) userUpdate.course = course
                if(role) userUpdate.role = role

                return res.status(200).json(await UserService.update(userUpdate, user_id));
            } catch(e){
                return res.status(500).json("Error");
            } 
        });
    }
}
