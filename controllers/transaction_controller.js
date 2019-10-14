const User=require('../models/user');
const Transaction= require('../models/transaction');
const Category=require('../models/category');

module.exports.create = async function(req,res){
    try {
        let user = await User.findById(req.user._id);
        if(user){
            if(req.body.tansMode=='Transfer'){
                
                let trfCat="";
                let trfCatFromSchema=await Category.find({name:'Transfer',transactionType:'Transfer'});
                if(trfCatFromSchema!=""){
                    trfCat=trfCatFromSchema[0]._id;
                }else{
                    let category= await Category.create({
                        name: 'Transfer',
                        user: req.user._id,
                        transactionType: 'Transfer',
                    })
                    user.category.push(category);
                    trfCat=category._id;
                }



                let sourceTransaction= await Transaction.create({
                
                    content: '-'+req.body.amount,
                    user: req.user._id,
                    accounttype: req.body.source,
                    category: trfCat,
                });
                let destinationTransaction= await Transaction.create({
                
                    content: req.body.amount,
                    user: req.user._id,
                    accounttype: req.body.destination,
                    category: trfCat,
                });
                user.transactions.push(sourceTransaction);
                user.transactions.push(destinationTransaction);
                user.save();

            }else if(req.body.tansMode=='Transfer'){




            }else{
                var cat=req.body.crCategory;
                var amt=req.body.amount;
                if(req.body.tansMode=='Debit'){
                    cat=req.body.drCategory;
                    amt= '-' + amt ;
                }
                if(req.body.newCategoryName!=""){
                    let catFromSchema=await Category.find({name:req.body.newCategoryName,transactionType:req.body.tansMode});
                    if(catFromSchema!=""){
                        cat=catFromSchema[0]._id;
                    }else{
                        let category= await Category.create({
                            name: req.body.newCategoryName,
                            user: req.user._id,
                            transactionType: req.body.tansMode
                        })
                        user.category.push(category);
                        cat=category._id;
                    }
                        
                    }
                    

                    let transaction= await Transaction.create({
                
                        content: amt,
                        user: req.user._id,
                        accounttype: req.body.accounttype,
                        category:cat,
                    });
                        console.log(transaction);
                        user.transactions.push(transaction);
                        user.save();    
            }
                
            
        }

        return res.redirect('back');
    } catch (err) {
        console.log('error in creating transaction');
        return;
    }
    
    }



    module.exports.delete = async function(req,res){
        try {
            let transaction = await Transaction.findById(req.params.id);

            transaction.remove();

            res.redirect('back');

        } catch (err) {
            console.log('error in deleting transaction');
        }
     }