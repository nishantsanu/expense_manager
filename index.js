const express= require('express');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');

const cookieParser= require('cookie-parser');
var bodyParser = require('body-parser'); 


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//view engine express setup
app.set('view engine','ejs');
app.set('views','./views');

//require database
const db= require('./config/mongoose');



//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressLayouts);

// cookieParser should be above session
app.use(cookieParser());

// bodyParser should be above methodOverride
app.use(bodyParser());

//using static
app.use(express.static('./assets/'));

//use express router
app.use('/',require('./routes'));

app.use(session({
    name:'ExpManager',
    //TODO change the secret before deployment to product mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

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