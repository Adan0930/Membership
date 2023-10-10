import passport from "passport";
import {encryptPassword} from '../lib/helpers.js';
import {pool} from '../database.js';

//login
export const renderSignUp = (req, res)=>{
    res.render("auth/signup");
};
export const renderSignin =(req,res)=>{
res.render("auth/sigin");
};
        //cardSignup
export const cardSignup =(req,res)=>{
    res.render("auth/card");
};
 

//Passport Local auth
export const singup = async (req,res,next)=>{
    const {user,password,password2} = req.body; 
    //Si no son identicos entre si 
    if(password !== password2){
        console.log('Las contraseñas no coinsiden');
        return res.redirect("/signup");
    }
    //Verificar si el nombre de usuario ya existe
    const [userExistence]= await pool.query('SELECT * FROM users WHERE user = ?',[user]);
    if(userExistence.length > 0){
        console.log('El usuario ya existe');
        return res.redirect('/signup')
    }
    //Crear un usuario 
    const User = {
        user
    };
    User.password = await encryptPassword(password);
    //Guardar en la base de datos 
    const [results]= await pool.query('INSERT INTO users SET ? ', User);
    //Se guarda el valor en User.id
    User.id = results.insertId;

    //login es una funcion proporcionada por passport 
    req.login(User,(err)=>{
        if(err){
            return next(err)
        }
        return res.redirect('/profile');
    });
};

//Passport.authenticate Local
    export const signin = passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/sigin",
});
//Cierre de session y manejo de algun err que se llegue a presentar
export const logout = (req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/')
    })
};

//Passport.authenticate Google
