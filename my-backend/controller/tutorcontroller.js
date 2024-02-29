const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Tutor = require('../models/tutorSchema')
const mailHelper = require('../helper/mail.js')

const postRegister=async(req,res)=>{
    try {
        let {name,email,password} = req.body
        const userAlreadyExist = await Tutor.find({email:email})  
        if(userAlreadyExist.length==0){
            let hashedpassword= await bcrypt.hash(password,10)
            let OTP= await mailHelper.sendOTPByEmail(email)
            if(OTP){res.json({otpsend:true,name,email,password:hashedpassword,OTP})} 
            else{res.json({otpsend:false,name,email,password:hashedpassword,OTP})}  
            }
        else{
            res.json({message:"tutor already registered"})
        }
       } catch (error) {
        res.json({message:"Network error or catch error"})
        console.log(error,"errrrrrr")
       }}

       // Tutor OTP verification
const verifyOtp=async(req,res)=>{
    try {
        const secret_key = "secret key"
        const {name,email,password}=req.body
        let hashedpassword= await bcrypt.hash(password,10)
        let newuser = new Tutor({name:name,email:email,password:hashedpassword})
        newuser.save()
        const accesstoken = jwt.sign(email,secret_key)
        res.json({message:"Successfully registered",tutoraccesstoken:accesstoken}) 
    } catch (error) {
        res.json({message:"error occured in registering"})
        console.log(error,"error occured")
    }
}
// User Otp Resend
const resendOtp=async(req,res)=>{
    try {
     const {email,password} = req.body
     let hashedpassword= await bcrypt.hash(password,10)
     let OTP= await mailHelper.sendOTPByEmail(email) 
     if(OTP){res.json({otpsend:true,email,password:hashedpassword,OTP})} 
         else{res.json({otpsend:false,email,password:hashedpassword,OTP})}   
    } catch (error) {
     res.json({message:"error occured in resending otp"})
     console.log(error,"error occured in resending otp")
    }
 }

 /*Fetching tutoro details */
const getTutorDetails = async (req, res) => {
    try {
        const secret_key='secret key'
        let email = req.user;
        console.log(email, "req.userin");
        let user = await Tutor.findOne({ email: email }); // Use findOne instead of find for a single user
        if (user) {
            const accesstoken = jwt.sign(email,secret_key)
            res.json({user,tutoraccesstoken:accesstoken});
        } else {
            res.json({ message: "No user found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error occurred in getting details" });
        console.log(error, "Error in getting user details");
    }
};
// Tutor Login
const tutorLogin = async(req,res)=>{
    try {
        const secret_key = 'secret key'
    let {email,password} = req.body
    let user = await Tutor.findOne({email:email})
    if(!user){
    res.json({message:"email not registered"})
    }else{
        let data = await bcrypt.compare(password,user.password)
        if(data){
            let accesstoken = jwt.sign(email,secret_key)
            res.json({message:"Successfully Logged",tutoraccesstoken:accesstoken})
        }
        else{
            res.json({message:"Invalid Password"})
    }
    }
    } catch (error) {
        console.log(error,"error in catch")
    }
    }
module.exports={
    postRegister,
    verifyOtp,
    resendOtp,
    getTutorDetails,
    tutorLogin
}