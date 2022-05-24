const User = require("../models/userModel");
const catchAsyncError =require("../middleware/catchAsyncError");
const ErrorHandler =require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {AccountHolderName,BankName,Branch,AccountNumber,IFSC_code,Pin}=req.body;
    const user=await User.create({
        AccountHolderName,
        BankName,
        Branch,
        AccountNumber,
        IFSC_code,
        Face:{
            public_id:"THIS IS A SAMPLE ID",
            url:"PROFILE_PIC_URL"
        },
        Pin
    });

    sendToken(user,201,res);
});


// ---------------- Login --------------

exports.loginUser = catchAsyncError(async (req,res,next)=>{
    const {AccountNumber,Pin}=req.body;
    //checking if user given pin is correct
    if(!AccountNumber || !Pin){
        return next(new ErrorHandler("Please Enter Your Pin ",400));
    }

    const user= await User.findOne({AccountNumber}).select("+Pin");
    
    if(!user){
        return next(new ErrorHandler("Invalid AccountNumber or Pin",401));
    }

    const isPinMatched = await user.comparePin(Pin);
    
    if(!isPinMatched){
        return next(new ErrorHandler("Invalid AccountNumber or Pin",401))
    }
    sendToken(user,200,res);

})

// -------------- Logout User ---------------

exports.logout= catchAsyncError(async(req,res,next)=>{

    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
})


// ------------- Get User Account Details ---------------

exports.getAccountDetails = catchAsyncError(async(req,res,next)=>{
    const user=await User.find();
    if(!user){
        return next(new ErrorHandler("User details not found",401))
    }

    res.status(200).json({
        success:true,
        user:req.user,
    });
})

// --------------- getTransaction ----------

exports.getTransaction = catchAsyncError(async(req,res,next)=>{
    const transaction = await User.find({Transaction:1});
    if(!transaction){
        return next(new ErrorHandler("Transaction data not found",401))
    }
    res.status(200).json({
        success:true,
        transaction,
    });
})