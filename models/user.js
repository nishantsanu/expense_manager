const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    transactions: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
        }
    ],
    category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Category'
         }
    ],
},{
    timestamps:true
});










// timestamps stored created at and updated at

const User= mongoose.model('User',userSchema);
module.exports=User;

const signinSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
});

