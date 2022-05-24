const User = require('../models/userModel');
const authorizeUser = async (req,res,next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({token:token});
        if(user){
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