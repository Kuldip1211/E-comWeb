const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name must be at least 4 characters long"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters long"],
    select: false
  },
  avatar: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

userSchema.pre('save',async function(next){
 if(!this.isModified("password")){
  next();
 }
 this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function(){
 return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
  expiresIn : process.env.JWT_EXPIRATION,
 })
}

userSchema.methods.comparePassword=async function(enterpassword){
 return await(bcrypt.compare(enterpassword,this.password));
}

module.exports = mongoose.model("User", userSchema);
