const mongoose= require('mongoose');

const tansactionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accounttype:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
    //include the array of ids of all the comments in this post schema itself
 
},{
    timestamps : true

});

const Transaction= mongoose.model('Transaction',tansactionSchema);
module.exports=Transaction;