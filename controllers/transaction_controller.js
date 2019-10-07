const User=require('../models/user');
const Transaction= require('../models/transaction');

module.exports.create = async function(req,res){
    try {
        let user = await User.findById(req.user._id);
        if(user){

                 
            let transaction= await Transaction.create({
                
                content: req.body.amount,
                user: req.user._id,
                accounttype: req.body.accounttype,
            });

            
                user.transactions.push(transaction);
                user.save();    
                
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

        console.log('created transaction');
      
        return res.redirect('back');
    } catch (err) {
        console.log('error in creating transaction');
        return;
    }
    
    }