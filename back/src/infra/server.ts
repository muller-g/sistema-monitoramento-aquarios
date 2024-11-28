import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use(express.text());
    }
}

export default new Server().app;
