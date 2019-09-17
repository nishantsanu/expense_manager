const express= require('express');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');

const cookieParser= require('cookie-parser');

app.use(express.urlencoded());
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//view engine express setup
app.set('view engine','ejs');
app.set('views','./views');

//require database
const db= require('./config/mongoose');

//using static
app.use(express.static('./assets/'));

//use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        // console.log('error entering port,Error:',err);
        //by interpolation-i.e variable inside string
        console.log(`error entering port,Error:${err}`);
        return;
    }

    console.log('server is running on port: ', port);

})