
// module.exports.home=function(req,res){
const Transaction=require('../models/transaction');
const Category=require('../models/category');
const User=require('../models/user');

//ASYNC AWAIT
module.exports.home=  async function(req,res){
    //error handeling by try catch
    try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/signin');
         }

         let transactions= await Transaction.find({user:req.user._id})
        .sort('-createdAt')
        .populate('category');

         let categoryListItems=await Category.find({user:req.user._id});
         let crListItems=await Category.find({user:req.user._id,transactionType:'Credit'});
         let drListItems=await Category.find({user:req.user._id,transactionType:'Debit'});
        
        let sum=0;
        let cash=0;
        let card1=0;
        let card2=0;
        for(i of transactions){
            sum=sum+parseFloat(i.content);
            if(i.accounttype=="cash"){
                cash=cash+parseFloat(i.content);
            }else if(i.accounttype=="card1"){
                
                card1=card1+parseFloat(i.content);
                
            }else if(i.accounttype=="card2"){
                card2=card2+parseFloat(i.content);
            }
        }
        
        return res.render('home',{
            title: "ExpManager | Home",
            transactions: transactions,
            crListItems:crListItems,
            drListItems:drListItems,
            sum:sum,
            cash:cash,
            card1:card1,
            card2:card2,
        });
    }catch(err){
        console.log('Error',err);
        return;
    }

}


