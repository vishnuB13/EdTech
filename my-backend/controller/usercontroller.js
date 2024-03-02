const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
const mailHelper = require('../helper/mail')

// Landing Page of Website
const LandingPage = (req,res)=>{
    res.json('Hi from Landing Page')
}

// User registration
const userRegister = async (req,res)=>{
    
   try {
    let {name,email,password} = req.body
    const userAlreadyExist = await User.find({email:email})  
    if(userAlreadyExist.length==0){
        let hashedpassword= await bcrypt.hash(password,10)
        let OTP= await mailHelper.sendOTPByEmail(email)
        if(OTP){res.json({otpsend:true,email,password:hashedpassword,OTP})} 
        else{res.json({otpsend:false,email,password:hashedpassword,OTP})}  
        }
    else{
        res.json({message:"user already registered"})
    }
   } catch (error) {
    res.json({message:"Network error or catch error"})
    console.log(error,"errrrrrr")
   }
}

// User OTP verification
const verifyOtp=async(req,res)=>{
    try {
        const secret_key = "secret key"
        const {name,email,password}=req.body
        let hashedpassword= await bcrypt.hash(password,10)
        let newuser = new User({name,email:email,password:hashedpassword})
        newuser.save()
        const accesstoken = jwt.sign(email,secret_key)
        res.json({message:"Successfully registered",accesstoken:accesstoken}) 
    } catch (error) {
        res.json({message:"error occured in registering"})
        console.log(error,"error occured")
    }
}

// User Otp Resend
const resendOtp=async(req,res)=>{
   try {
    const {name,email,password} = req.body
    console.log(name,"in resend otp controller")
    let hashedpassword= await bcrypt.hash(password,10)
    let OTP= await mailHelper.sendOTPByEmail(email) 
    console.log(OTP,"new otp sent")
    if(OTP){res.json({otpsend:true,email,password:hashedpassword,OTP})} 
        else{res.json({otpsend:false,email,password:hashedpassword,OTP})}   
   } catch (error) {
    res.json({message:"error occured in resending otp"})
    console.log(error,"error occured in resending otp")
   }
}

/*Fetching user details */
const getUserDetails = async (req, res) => {
    try {
        console.log(req.user,"data in the request")
        let email = req.user.email||req.user
        console.log(email, "req.userin");
        let user = await User.findOne({ email: email }); // Use findOne instead of find for a single user
        if (user) {
            res.json({user});
        } else {
            res.json({ message: "No user found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error occurred in getting details" });
        console.log(error, "Error in getting user details");
    }
};


// User Login
const userLogin = async(req,res)=>{
try {
    const secret_key = 'secret key'
let {email,password} = req.body
let user = await User.findOne({email:email})
if(!user){
res.json({message:"email not registered"})
}else{
    let data = await bcrypt.compare(password,user.password)
    if(data){
        let accesstoken = jwt.sign(email,secret_key)
        res.json({message:"Successfully Logged",accesstoken:accesstoken})
    }
    else{
        res.json({message:"Invalid Password"})
}
}
} catch (error) {
    console.log(error,"error in catch")
}
}

// Google Sign in 
const googleSignIn = async(req,res)=>{
    try {
        const secret_key= "secret key"
const email = req.body.email
const name = req.body.name
let userAlreadyExist= await User.findOne({email:email})
if(userAlreadyExist){
    const newtoken = jwt.sign({email:email},secret_key)
    res.json({accesstoken:newtoken,name:userAlreadyExist.name})
}
else{
    const newUser = {email,name,password:"password"}
    let googleSign = await User.create(newUser);
    const accesstoken = jwt.sign({email:email},secret_key)
    const data = {"accesstoken":accesstoken,name:name}
    res.json(data)

}




    } catch (error) {
      console.log(error,'google error')  
    }
}

// User Logout
const userLogout = async(req,res)=>{
    try {
        const cookies = req.cookies
        for (const cookieName in cookies) {
            res.clearCookie(cookieName);
        }
        res.json({message:"successfully logged out"})
    } catch (error) {
        res.json({message:'error in logout'})
    }
}



module.exports={
    LandingPage,
    userRegister,
    verifyOtp,
    resendOtp,
    userLogin,
    googleSignIn,
    getUserDetails,
    userLogout,
    
}