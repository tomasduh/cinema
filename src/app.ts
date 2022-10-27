import express, {Express} from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import adminRoutes from './routes/admin.routes';
import path from 'path';
import config from './config';

abstract class ConfigServer {
    private _app:Express = express();

    constructor() {
        this._app.set('PORT', config.PORT);
        this._app.set('view engine', 'ejs');
        this._app.set('views', path.join(__dirname, './views'));
        this._app.use('/public', express.static(path.join(__dirname, '../public')));
        this._app.use(morgan('dev'));
        this._app.use(cookieParser());
        this._app.use(express.urlencoded({ extended: false}));
        this._app.use(express.json());
        adminRoutes(this._app);
    }

    get app():Express{
        return this._app;
    }
}

export default ConfigServer;