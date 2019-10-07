const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const transactionController= require('../controllers/transaction_controller');
const passport=require('passport');

router.get('/profile',usersController.profile);
//signin

router.get('/signin',usersController.signin);
//signup
router.get('/signup',usersController.signup);

router.post('/create',usersController.create);

// router.post('/createSession',usersController.createSession);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),usersController.createSession);

router.get('/signout',usersController.destroySession);

router.post('/transaction',transactionController.create);

module.exports=router;