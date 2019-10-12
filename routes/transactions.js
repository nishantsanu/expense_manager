const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_controller');
const transactionController= require('../controllers/transaction_controller');
const passport=require('passport');

router.post('/create',transactionController.create);

router.get('/delete/:id',transactionController.delete);



module.exports=router;