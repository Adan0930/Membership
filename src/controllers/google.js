import passport from "passport";
import {pool} from "../database.js"
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (accesToken, refreshToken, profile, done)=>{
        const email = profile.emails[0].value;
        pool.query('INSERT INTO users (email) VALUES (?)',[email],(error,results)=>{
            if(error){
                console.error('Error al guardar el Email', error);
            }else{
                console.log('Email guardado correctamente')
            }
        })
        return done(null, profile);
    })
);

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
   
    done(null,user);
    console.log(user);

   
});

export default passport