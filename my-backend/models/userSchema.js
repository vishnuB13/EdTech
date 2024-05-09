const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
name:{type:String,required:true},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
gender:{type:String},
coursesEnrolled:[{type:mongoose.Schema.Types.ObjectId,ref:"Course"}],
image:{type:String},
isBlocked:{type:Boolean,default:false,required:true},
interests:[{type:String}]
})

const User = mongoose.model('User',userSchema)
module.exports=User