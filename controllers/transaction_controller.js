const User=require('../models/user');
const Transaction= require('../models/transaction');
const Category=require('../models/category');

module.exports.create = async function(req,res){
    try {
        let user = await User.findById(req.user._id);
        if(user){
            if(req.body.tansMode=='Transfer'){
                let sourceTransaction= await Transaction.create({
                
                    content: '-'+req.body.amount,
                    user: req.user._id,
                    accounttype: req.body.source,
                    category: 'transfer',
                });
                let destinationTransaction= await Transaction.create({
                
                    content: req.body.amount,
                    user: req.user._id,
                    accounttype: req.body.destination,
                    category: 'transfer',
                });
                user.transactions.push(sourceTransaction);
                user.transactions.push(destinationTransaction);
                user.save();

            }else{
                var cat=req.body.category;
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
                
                        content: req.body.amount,
                        user: req.user._id,
                        accounttype: req.body.accounttype,
                        category:cat,
                    });
                        user.transactions.push(transaction);
                        user.save();    
            }
                
            //     comment= await comment.populate('user','name email').execPopulate();
            // //calling comments mailer
            //     commentsMailer.newComment(comment);
            //     if(req.xhr){
            //         return res.status(200).json({
            //             data: {
            //                 comment: comment,
            //             },
            //             message: "Comment created!"
            //         });
            //     }
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