
// module.exports.home=function(req,res){
   

//ASYNC AWAIT
module.exports.home=  async function(req,res){
    //error handeling by try catch

    console.log(req.cookies);
    try{
        
        return res.render('home',{
            title: "ExpManager | Home",
        });
    }catch(err){
        console.log('Error',err);
        return;
    }

}


