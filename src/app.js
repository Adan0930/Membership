import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import{create} from 'express-handlebars';
import routes from './routes/index.js';
import session from 'express-session';
import {pool} from './database.js';
import morgan from 'morgan';
import passport from 'passport';
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import google from './controllers/google.js'
import expressMySQLSession from "express-mysql-session";
import flash from "connect-flash";


//Initializations
const app = express();
    //path.dirname(fileURLToPath(import.meta.url)) toma la URL del archivo actual, la convierte en una ruta local de archivo y luego extrae el directorio raíz de esa ruta.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MySQLStore = expressMySQLSession(session);


//Settings
app.set("views", path.join(__dirname, "views"));
app.engine(
    ".hbs",
    create({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"),"layouts"),
        partialsDir: path.join(app.get("views"),"partials"),
        extname:".hbs"
    }).engine
);
app.set("view engine",".hbs");

//Middelwares
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(
    session({
        secret: "adsaherr",
        resave: false,
        saveUninitialized: false,
        store: new MySQLStore({},pool)
  
    })
);
app.use(passport.initialize());
app.use(passport.session());



// Routes
app.use(routes);


//Public
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000);
console.log('Estamos iniziando el servidor');



