const User=require('../models/user');
const Transaction= require('../models/transaction');

module.exports.create = async function(req,res){
    try {
        let user = await User.findById(req.user._id);
        if(user){
            if(req.body.accounttype=='trf'){
                console.log(req.body.source);
                let sourceTransaction= await Transaction.create({
                
                    content: '-'+req.body.amount,
                    user: req.user._id,
                    accounttype: req.body.source,
                    catogery: 'transfer',
                });
                let destinationTransaction= await Transaction.create({
                
                    content: req.body.amount,
                    user: req.user._id,
                    accounttype: req.body.destination,
                    catogery: 'transfer',
                });
                user.transactions.push(sourceTransaction);
                user.transactions.push(destinationTransaction);
                user.save();

            }else{
            let transaction= await Transaction.create({
                
                content: req.body.amount,
                user: req.user._id,
                accounttype: req.body.accounttype,
                catogery:req.body.catogery,
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