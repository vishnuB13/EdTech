const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminSchema')
const Course = require('../models/courseSchema')
const Category = require('../models/categorySchema')
const { json } = require('express')

const getLogin = async (req, res) => {
    try {
      const secret_key = "secret key";
      const { email, password } = req.body;
      let admin = await Admin.find({ email: email });
      
      if (admin.length > 0) {
        let hashedPassword = admin[0].password;
        await bcrypt.compare(password, hashedPassword, (err, result) => {
          if (err) {
            return res.json({ message: "Incorrect password" });
          }
          if (result) {
            const accesstoken = jwt.sign(email, secret_key);
            return res.json({ message: "Successfully logged", accesstoken: accesstoken });
          }
        });
      } else {
        return res.json({ message: "Email is not registered" });
      }
    } catch (error) {
      return res.json({ message: "network error or error in catch" });
    }
  };
  
//  Admin Logout
const adminLogout = async(req,res)=>{
    try {
        const cookies = req.cookies
        for(const cookieName of cookies){
           res.clearCookie(cookieName)
        }
        res.json({message:"Admin Logout Successfully"})
    } catch (error) {
        res.json({message:"error occured in Admin Logout"})
        console.log(error,"error in admin Loout")
    }
}
const googleSignIn= async(req,res)=>{
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

const adminDetails = async(req,res)=>{
  try {
    console.log(req.admin,"data in the request")
    let email = req.admin.email||req.admin
    console.log(email, "req.userin");
    let admin = await Admin.findOne({ email: email }); // Use findOne instead of find for a single user
    if (admin) {
        res.json({admin});
    } else {
        res.json({ message: "No data found" });
    }
} catch (error) {
    res.status(500).json({ message: "Error occurred in getting details" });
    console.log(error, "Error in getting user details");
}
}

const addCategory=async(req,res)=>{
  try {
    console.log(req.body,"reqbody in add course controller")
    const { coursename, courseImage, courseDescription } = req.body
    console.log(coursename,"name")
    console.log(courseImage,"image")
    console.log(courseDescription,"description")
    if(!courseImage){res.json({message:"Image not uploaded successfully"})}
    let courseAlreadyExist = await Category.findOne({ categoryName: coursename })
    if(courseAlreadyExist){
        res.json({message:"Category already exists"})
    } else {
        const newCategory = { categoryName: coursename, categoryImage: courseImage, categoryDescription: courseDescription }
        let categoryCreated = await new Category(newCategory)
        categoryCreated.save()
        res.json({message:"Category Successfully Created"})
    }
} catch (error) {
    console.log(error,"error in catch")
}
}


const getCategories = async(req,res)=>{
  try{
    let data = await Category.find({})
   console.log(data,'data from database')
   res.json(data)
  }catch(error){
console.log(error,"error")
  }  
}

const categoryEdit = async(req,res)=>{
try {
  await Category.updateOne({"_id":req.body.categoryId},req.body.updatedCategory)
  res.json({message:"Successfully edited"})
} catch (error) {
  console.log(error,"error in edit catch")
}
}

const ChangeListed = async(req, res) => {
  try {
    const { categoryId, isListed } = req.body;
    await Category.updateOne({ "_id": categoryId }, { "isListed": isListed });
    if (isListed) {
      res.json({ message: "Successfully Listed" });
    } else {
      res.json({ message: "Successfully Unlisted" });
    }
  } catch (error) {
    console.error("Error updating category list status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const addCourses=async(req,res)=>{
  try {
    console.log(req.body,"reqbody in add course controller")
    const { coursename, courseImage, courseDescription, courseCategory } = req.body
    console.log(coursename,"name")
    console.log(courseImage,"image")
    console.log(courseDescription,"description")
    console.log(courseCategory,'category')
    let courseAlreadyExist = await Course.findOne({ courseName: coursename })
    if(courseAlreadyExist){
        res.json({message:"Course already exists"})
    } else {
        const newCourse = { coursename: coursename, courseImage: courseImage, courseDescription: courseDescription, courseCategory:courseCategory }
        let courseCreated = await new Course(newCourse)
        courseCreated.save()
        res.json({message:"Course Successfully Created"})
    }
} catch (error) {
    console.log(error,"error in catch")
    res.json({message:error.message})
}
}

const getCourses = async(req,res)=>{
  try{
    let data = await Course.find({})
   console.log(data,'data from database')
   res.json(data)
  }catch(error){
console.log(error,"error")
  }  
}



module.exports={
    getLogin,
    adminLogout,
    googleSignIn,
    adminDetails,
    addCategory,
    getCategories,
    categoryEdit,
    ChangeListed,
    addCourses,
    getCourses
}