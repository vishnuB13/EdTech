const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/adminSchema')
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


module.exports={
    getLogin,
    adminLogout
}