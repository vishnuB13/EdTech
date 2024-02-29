const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/usercontroller')
const userAuthenticate = require('../helper/authentication.js')

router.get('/landing',usercontroller.LandingPage)
router.post('/register',usercontroller.userRegister)
router.post('/verify-otp',usercontroller.verifyOtp)
router.post('/resend-otp',usercontroller.resendOtp)
router.post('/details',userAuthenticate,usercontroller.getUserDetails)
router.post('/login',usercontroller.userLogin)
router.post('/googlesign',usercontroller.googleSignIn)
router.get('/logout',usercontroller.userLogout)
module.exports=router;