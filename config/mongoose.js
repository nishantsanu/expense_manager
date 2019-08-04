//first install by npm install mongoose
const mongoose = require('mongoose');

//connect mongoose to file
mongoose.connect('mongodb://localhost/expense_manager');

const db=mongoose.connection;

db.on('error',console.error.bind('Error connecting to mongodb'));

db.once('open',function(){
    console.log('Connected to database:: MongoDB');
});

module.exports=db;