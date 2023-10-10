import passport from 'passport';
import {Router} from 'express';
import {
  renderSignUp,
  singup,
  renderSignin,
  signin,
  logout,
  cardSignup,
} from "../controllers/auth.controller.js"

const router = Router();

router.get('/registered',cardSignup);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google',{
  successRedirect:'/profile',
  failureRedirect:'/auth/google'
}));

//sigup
router.get('/signup',renderSignUp)
router.post('/signup',singup)

//singin
router.get('/sigin',renderSignin);
router.post('/sigin',signin)

//cierre de session
router.get("/logout",logout);

export default router;