const mongoose =require("mongoose");
const bcrypt= require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    AccountHolderName:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Cannot exceed 30 Characters"],
        minlength:[4,"Name is too short"],
    },
    BankName:{
        type:String,
        required:[true,"Please Enter Your Bank Name"],
        minlength:[2,"Name is too short"],
    },
    Branch:{
        type:String,
        required:[true,"Please Enter Your Branch Name"],
        minlength:[2,"Name is too short"],
    },
    Email:{
        type:String,
        maxlength:[30,"Cannot exceed 100 Characters"],
    },
    PhoneNumber:{
        type:String,
        required:[true,"Please Enter Your Phone Number"],
        maxlength:[15,"Cannot exceed 15 Characters"],
    },
    RelationField:{
        type:String,
        maxlength:[30,"Cannot exceed 30 Characters"],
    },
    CIFNumber:{
        type:String,
        maxlength:[20,"Cannot exceed 20 Characters"],
    },
    MICRNumber:{
        type:String,
        maxlength:[20,"Cannot exceed 20 Characters"],
    },
    AccountType:{
        type:String,
        maxlength:[100,"Cannot exceed 100 Characters"],
    },
    DOB:{
        type:Date
    },
    Address:{
        type:String,
        maxlength:[1000,"Cannot exceed 1000 Characters"],
    },
    AccountNumber:{
        type:String,
        required:[true, "Please Enter Your Account Number"],
    },
    IFSC_code:{
        type:String,
        required:[true,"Please Enter Your IFSC code"],
        maxlength:[20,"Cannot exceed 20 Characters"],
    },
    Pin:{
        type:String,
        required:[true,"Please Enter Your Pin"],
        maxlength:[6,"Cannot exceed 6 Characters"],
        minlength:[6,"Pin is too short"],
    },
    Picture:{
        type:String,
        required:[true,"Please Enter Your Picture"],
        maxlength:[5000,"Cannot exceed 5000 Characters"],
    },
    Token:{
        type:String,
        maxLength:[100,"Cannot exceed 100 characters"],
    },
    Token_created_at:{
        type:Date,
    },
    TotalBalance:{
        type:Number,
        default:0
    },
    Pin:{
        type:String,
        select:false,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
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