const express = require('express')
const router = express.Router()
const tutorController = require('../controller/tutorcontroller')
const authenticateToken = require('../helper/tutorauthentication')


router.post('/register',tutorController.postRegister)
router.post('/details',authenticateToken,tutorController.getTutorDetails)
router.post('/verify-otp',tutorController.verifyOtp)
router.post('/resend-otp',tutorController.resendOtp)
router.post('/login',tutorController.tutorLogin)

module.exports=router 