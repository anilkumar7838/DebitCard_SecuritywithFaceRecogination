const mongoose =require("mongoose");

const transactionSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    amount:{
        type:Number,
        required:[true,"Please Enter Amount"],
        min:0,
    },
    transactionType:{
        type:String, //e.g Fund Transfer, Withdrawl, cash deposit, etc
        required:[true,"Please Enter Transaction Type"],
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
});
module.exports=mongoose.model('Transaction',transactionSchema);
