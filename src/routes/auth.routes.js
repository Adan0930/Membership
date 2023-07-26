import {Router} from 'express';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from 'passport';
import google from '../controllers/google.js'

const router = Router();


router.get('/login', (req,res)=>{
  res.render('./auth/signup')
}); 

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect:'/profile',
    failureRedirect:'/auth'
}));

router.get('/profile', ensureAuthenticated, (req, res) => {
    res.send('¡Bienvenido a tu perfil!');
  });
  
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth');
  }

  
  
  
  
 
export default router;