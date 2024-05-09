const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Tutor = require('../models/tutorSchema.js')
const mailHelper = require('../helper/mail.js')
const Modules = require('../models/moduleSchema.js')

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
        const secret_key = process.env.JWT_SECRET
        const {name,email,password}=req.body
        let hashedpassword= await bcrypt.hash(password,10)
        let newuser = new Tutor({name:name,email:email,password:hashedpassword})
        newuser.save()
        const accesstoken = jwt.sign({email:email,role:"tutor"},secret_key)
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
        let email = req.user.email || req.user
        let role = req.user.role 
        let tutor = await Tutor.findOne({ email: email });
        if (tutor) {
            res.json({tutor, role});
        } else {
            res.json({ message: "No user found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error occurred in getting details" });
        console.log(error, "Error in getting user details");
    }
};

const getTutorProfile = async (req, res) => {
    try {
        const userid = req.params.userid
        let user = await Tutor.findOne({ "_id": userid })
        if (user) {
            console.log(user)
            res.json(user)
        }
        else { res.json({ message: "no profile matched" }) }
    } catch (error) {
        console.log(error, "error in show profile") 
        res.json("eroor")
    }
}
// Tutor Login
const tutorLogin = async(req,res)=>{
    try {
        const secret_key = process.env.JWT_SECRET
    let {email,password} = req.body
    let user = await Tutor.findOne({email:email})
    if(!user){
    res.json({message:"email not registered"})
    }else{
        let data = await bcrypt.compare(password,user.password)
        if(data){
            let accesstoken = jwt.sign({email:email,role:"tutor"},secret_key)
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
    const googleSignIn=async(req,res)=>{
        try {
    const secret_key= process.env.JWT_SECRET
    const email = req.body.email
    const name = req.body.name
    let userAlreadyExist= await User.findOne({email:email})
    if(userAlreadyExist){
        const newtoken = jwt.sign({email:email,role:"tutor"},secret_key)
        res.json({tutoraccesstoken:newtoken,name:userAlreadyExist.name})
    }
    else{
        const newUser = {email,name,password:"password"}
        let googleSign = await User.create(newUser);
        const tutoraccesstoken = jwt.sign({email:email,role:"tutor"},secret_key)
        const data = {"tutoraccesstoken":tutoraccesstoken,name:name}
        res.json(data)
    
    }
        } catch (error) {
          console.log(error,'google error')  
        }
    }
    const tutorLogout = async(req,res)=>{
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

    const addModules = async(req,res)=>{
        console.log("in add modules controller")
        console.log(req.body,'data in req body')
        try {
            // // Extract module information from the request body
            // const { moduleName } = req.body;
        
            // // Extract video details for each uploaded video
            // const videos = [];
            // for (let i = 0; i < req.files.length; i++) {
            //   const file = req.files[i];
            //   const { title, description, duration } = req.body.videos[i];
              
            //   // Upload video to Cloudinary
            //   const result = await cloudinary.uploader.upload(file.path, { resource_type: 'video' });
        
            //   // Store video details along with the Cloudinary URL
            //   videos.push({
            //     title,
            //     description,
            //     duration,
            //     videoUrl: result.secure_url
            //   });
            // }
        
            // // Create a new module document
            // const module = new Modules({
            //   moduleName,
            //   videos
            //   // Additional module fields can be added here
            // });
        
            // // Save the module document to the database
            // await module.save();
        
            // res.status(201).json({ message: 'Module created successfully', module });
          } catch (error) {
            console.error('Error creating module:', error);
            res.status(500).json({ error: 'Internal server error' });
          }
        }

        const profileEdit = async(req,res)=>{
        try {
            console.log(req.body,"body received")
        } catch (error) {
            console.log(error,"error in catch")
            res.json({message:"error in catch"})
        }
        }
        
    

    const getModules = async(req,res)=>{
       let data =  await Modules.find({})
       res.json(data)
    }
module.exports={
    postRegister,
    verifyOtp,
    resendOtp,
    getTutorDetails,
    tutorLogin,
    googleSignIn,
    tutorLogout,
    addModules,
    getModules,
    profileEdit,
    getTutorProfile,
    // getProfile
}