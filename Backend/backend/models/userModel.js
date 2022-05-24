const mongoose =require("mongoose");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    AccountHolderName:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Cannot exceed 30 Characters"],
        minlength:[4,"Name is too short"],
    },
    BankName:{
        type:String,
        required:[true,"Please Enter Your Bank Name"],
        minlength:[6,"Name is too short"],
    },
    Branch:{
        type:String,
        required:[true,"Please Enter Your Branch Name"],
        minlength:[6,"Name is too short"],
    },
    AccountNumber:{
        type:Number,
        required:[true, "Please Enter Your Account Number"],
    },
    IFSC_code:{
        type:String,
        required:[true,"Please Enter Your IFSC code"],
        maxlength:[20,"Cannot exceed 20 Characters"],
    },
    token:{
        type:String,
        maxLength:[100,"Cannot exceed 100 characters"],
    },
    TotalBalance:{
        type:Number,
        default:0
    },
    Face:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    Pin:{
        type:String,
        select:false,
        required:true,
    },
    Transaction:[
        {
            name:{
                type:String,
                required:true,
            },
            accountNumber:{
                type:Number,
                required:true
            },
            bankName:{
                type:String,
                required:true
            },
            IFSC_code:{
                type:String,
                required:[true,"Please Enter IFSC code"],
                maxlength:[20,"Cannot exceed 30 Characters"],
            },
            Amount:{
                type:String,
                required:[true,"Please Enter the Amount to transfer"],
                maxlength:[20,"Cannot exceed 20 Characters"],
            },

        }
    ],
    createAt:{
        type:Date,
        default:Date.now,
    },
    resetPinToken:String,
    resetPinExpire:Date,
});


userSchema.pre("save",async function(next){
    if(!this.isModified("Pin")){
        next();
    }
    // let text= this.Pin;
    // this.Pin=await bcrypt.hash(text.toString(),10);
    this.Pin=await bcrypt.hash(this.Pin,10);
 });

// JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePin = async function(enteredPin ){
    return await bcrypt.compare(enteredPin,this.Pin);
}


module.exports=mongoose.model('User',userSchema);