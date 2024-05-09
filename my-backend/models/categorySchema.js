const mongoose = require('mongoose')
 const categorySchema = mongoose.Schema({
    categoryName:{type:String,required:true},
    categoryImage:{type:String,required:true},
    categoryDescription:{type:String,required:true},
    isListed:{type:Boolean,default:true}
})

const Category = mongoose.model("Category",categorySchema)
module.exports=Category;