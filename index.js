const express= require('express');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');

const cookieParser= require('cookie-parser');
const session=require('express-session');
const bodyParser = require('body-parser'); 
const passport=require('passport');
const MongoStore=require('connect-mongo')(session);


const passportLocal=require('./config/passport-local-strategy');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//view engine express setup
app.set('view engine','ejs');
app.set('views','./views');

//require database
const db= require('./config/mongoose');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);



//using static
app.use(express.static('./assets/'));





app.use(session({
    name:'ExpManager',
    //TODO change the secret before deployment to product mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie: { secure: false },
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {

        mongooseConnection:db,
        autoRemove:'disabled'

        },
        function(err){
            console.log(err || 'connect mongo-db setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


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