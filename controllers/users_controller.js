//require user from model
const User=require('../models/user');
const Transaction=require('../models/transaction');

module.exports.profile=function(req,res){

    return res.render('user_profile',{
        title:'Profile'
    });
} 

//render the signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
     }

    return res.render('sign_in',{
        title:'ExpManager | Signin'
    });
}
//render the signup page
module.exports.signup=function(req,res){
    if(req.isAuthenticated()){
        console.log('yes');
        return res.redirect('/');
     }
    return res.render('sign_up',{
        title: "ExpManager | Signup",
    });
}
//create data


module.exports.create=function(req,res){
    console.log("inside create");

    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('Error in creating new user'); return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating new user while signup');return;}
                return res.redirect('/users/signin');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

//FOR signin request
module.exports.createSession=function(req,res){
    //step to authenticate
    //find the user
   
    // User.findOne({ email:req.body.email},function(err,user){
    //     if(err){console.log('Error in signin'); return;}
    //     //user found
    //     if(user){
    //         //handel password which doesnt match
    //         if(user.password!=req.body.password){
    //             return res.redirect('back');
    //         }
    //         //handle session creation
    //         res.cookie('user_id',user.id);

    //         return res.redirect('/');

    //     }
    //     else{
    //         //handel user not found
    //         return res.redirect('back');
    //     }
    // });
    console.log('login successful');
    return res.redirect('/');
} 

module.exports.destroySession=function(req,res){
    req.logout();
    req.session = null;
    res.clearCookie("ExpManager");
    return res.redirect('/');
} 

module.exports.createTransaction=function(req,res){
    console.log('inside create transaction');
   return res.json({ a: 1 });
}