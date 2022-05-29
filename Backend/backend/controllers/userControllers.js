const User = require("../models/userModel");
const Transaction = require("../models/transactionModel");
const catchAsyncError =require("../middleware/catchAsyncError");
const ErrorHandler =require("../utils/errorHandler");
const sendEmail = require("../utils/sendEmail");


// ------------- Get User Account Details ---------------

exports.getAccountDetails = catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user,
    });
})

// --------------withdrawCash ---------------
exports.withdrawCash = catchAsyncError(async(req,res,next)=>{
    const Amount = Number(req.body.Amount);
    const user = req.user;
    if(user.TotalBalance<Amount){
        return next(new ErrorHandler("Insufficient Balance",401));
    }
    user.TotalBalance-=Amount;
    user.save();
    const transaction = await Transaction.create({
        sender:user._id,
        receiver:null,
        amount:Amount,
        transactionType:"Withdrawal",
    });
    res.status(200).json({
        success:true,
        transaction_id:transaction._id,
    })
})

// ------------------- Fund Transfer ------------------------------
exports.fundTransfer = catchAsyncError(async(req,res,next)=>{
    const {AccountNumber,Amount,BankName,IFSC_code,AccountHolderName}=req.body;
    const Amt = Number(Amount);
    const user = req.user;
    const receiver = await User.findOne({AccountNumber});
    if(!receiver){
        return next(new ErrorHandler("Receiver AccountNumber not found",401));
    }
    if(!(receiver.AccountHolderName==AccountHolderName && receiver.BankName==BankName && receiver.IFSC_code==IFSC_code)){
        return next(new ErrorHandler("Details Not matched"),401);
    }
    if(user.TotalBalance<Amt){
        return next(new ErrorHandler("Insufficient Balance",401));
    }
    user.TotalBalance-=Amt;
    receiver.TotalBalance+=Amt;
    user.save();
    receiver.save();
    const transaction = await Transaction.create({
        sender:user._id,
        receiver:receiver._id,
        amount:Amt,
        transactionType:"Fund Transfer",
    });
    res.status(200).json({
        success:true,
        transaction_id:transaction._id,
    })

})


// ------------------- Mini Statement ------------------------
exports.miniStatement = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    const transactions = await Transaction.find({$or:[{sender:user._id},{receiver:user._id}]}).populate({path:"sender",model:"User",select:"AccountHolderName AccountNumber"}).populate({path:"receiver",model:"User",select:"AccountHolderName AccountNumber"}).sort({timestamp:-1});
    res.status(200).json({
        success:true,
        transactions:transactions
    })
})


// --------------- send Email ------------

exports.getReview =catchAsyncError(async(req,res,next)=>{
    const review = req.body;
    const reviewMessage= `Name :- ${review.name} \nEmail:- ${review.email}\nMessage:- ${review.message}`;
    const confirmationMessage= `Thanks for your review .\n We truely appreciate your effort`;

    try{
        await sendEmail({
            reciever:process.env.SMPT_MAIL,
            subject:`Reviews`,
            message:reviewMessage,
        });
        await sendEmail({
            reciever:review.email,
            subject:`Greetings`,
            message:confirmationMessage,
        });
        res.status(200).json({
            success:true,
            message:`Email sent successfully`,
        });
    }catch(error){
        return next(new ErrorHandler(error.message,500));
    }
})