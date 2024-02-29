const mongoose = require('mongoose')

const tutorSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
password:{type:String,required:true}
})

const Tutor = mongoose.model('Tutor',tutorSchema)
module.exports=Tutor