const express = require('express')
const router = express.Router()
const adminController = require('../controller/admincontroller.js')
const adminAuthenticate = require('../helper/adminauthentication.js')
const { admin } = require('googleapis/build/src/apis/admin/index.js')
router.post('/login',adminController.getLogin)
router.post('/logout',adminController.adminLogout)
router.post('/googlesign',adminController.googleSignIn)
router.post('/details',adminAuthenticate,adminController.adminDetails)
router.post('/category-add',adminController.addCategory)
router.route('/category').get(adminController.getCategories).put(adminController.categoryEdit).patch(adminController.ChangeListed)
router.post('/course-add',adminController.addCourses)
router.get('/courses',adminController.getCourses)


module.exports=router