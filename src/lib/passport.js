import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {pool} from "../database.js" 
import * as helpers from "./helpers.js";
import dotenv from 'dotenv';
dotenv.config();

//PASSPORT-LOCAL
passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField:"user",
            passwordField: "password",
            passReqToCallback: true,
        },
        //done = indicar el final de un proceso de autenticación y comunicar el resultado de ese proceso

        async(req,user,password,done)=>{
            //Buscar al usuario en la base de datos users
            const[rows]= await pool.query('SELECT * FROM users WHERE user = ? ',[user]);
            //! invierte el valor de un booleano  
            if(!rows.length) return done(null,false,console.log('no se encontro el usuario '));
            
            const newUser = rows[0];

            const validPassword =  await helpers.matchPassword(
                password, 
                newUser.password
            );
            console.log(validPassword);
            if(!validPassword) return done(null,false,console.log('Contraseña incorrecta'));
            done(null,newUser,console.log('Estamos en tu perfil ' + newUser.user));
        }
    )
);
/*passport.serializeUser((newUser,done)=>{
    done(null,newUser.id);
});
passport.deserializeUser(async(id,done)=>{
    const [rows]= await pool.query('SELECT * FROM users WHERE id = ?',[id]);
    done(null,rows[0]);
    
});
*/
//GOOGLE
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async(accesToken, refreshToken, profile, done)=>{
        const user = {
            id_google: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value  
        };
        try{
            //Buscar al usuario en la base de datos por medio de su googleId
            const [rows] = await pool.query('SELECT * FROM users_google WHERE id_google = ?',[profile.id]);
            
            if(rows.length === 0){
                //El usuario no existe,inserta los datos 
                await pool.query('INSERT INTO users_google SET ?',user);
                console.log('Datos del usuario guardados correctamente'); 
            }
            return done(null, profile);
        } catch(err){
            console.error('Error al guardar o actualizar los datos del usuario',err);
            return done(err);
        }   
        
       
    })
);
//Serializacion y Deserealizacion
passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
   done(null,user);
   console.log(user);
});

export default passport



