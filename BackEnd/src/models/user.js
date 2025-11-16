const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:10,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:8,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
        minLength:10,
        maxLength:10,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    }
})
const User=mongoose.model("user",userSchema);
module.exports=User;


