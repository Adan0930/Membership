//isAuthenticated comprobar si un usuario ha iniciado sesión antes de permitirles acceder a ciertas rutas 
export const isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()) return next();
    res.redirect('/sigin');
}

