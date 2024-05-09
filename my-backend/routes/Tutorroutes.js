const express = require('express')
const router = express.Router()
const tutorController = require('../controller/tutorcontroller')
const authenticateToken = require('../helper/authentication')


router.post('/register',tutorController.postRegister)
router.get('/details',authenticateToken('tutor'),tutorController.getTutorDetails)
router.post('/verify-otp',tutorController.verifyOtp)
router.post('/resend-otp',tutorController.resendOtp)
router.post('/login',tutorController.tutorLogin)
router.post('/googlesign',tutorController.googleSignIn)
router.post('/add-modules',tutorController.addModules)
router.post('/modules',tutorController.getModules)
router.post('/add-module',tutorController.addModules)
router.route('/:userid').get(tutorController.getTutorProfile).put(tutorController.profileEdit)
router.get('/logout',tutorController.tutorLogout)

module.exports=router 