const express = require('express')
const router = express.Router()
const adminController = require('../controller/admincontroller.js')
router.post('/login',adminController.getLogin)
router.post('/logout',adminController.adminLogout)

module.exports=router