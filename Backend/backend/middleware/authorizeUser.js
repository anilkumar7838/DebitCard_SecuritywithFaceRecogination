const User = require('../models/userModel');

const authorizeUser = async (req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({Token:token}).select({Transaction:0,Pin:0,Token:0,id:0});
        if(user){
            const dt = new Date(user.Token_created_at);
            const dt_now = new Date();
            if ((dt_now-dt)>20*60*1000){
                return next(new ErrorHandler("Token Expired",401));
            }
            req.user = user;
            next();
        }
        else{
            res.status(401).json({
                success:false,
                message:"User not found"
            })
        }
    }
    else{
        res.status(401).json({
            success:false,
            message:"Unauthorized"
        });
    }
}
module.exports = authorizeUser;