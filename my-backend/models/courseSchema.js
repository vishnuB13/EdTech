const mongoose = require('mongoose')
 const courseSchema = mongoose.Schema({
    coursename:{type:String,required:true},
    courseImage:{type:String,required:true},
    courseDescription:{type:String,required:true},
    courseCategory:{type:String,required:true},
    modules:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }]
 })

 const Course = mongoose.model("Course",courseSchema)
 module.exports=Course;