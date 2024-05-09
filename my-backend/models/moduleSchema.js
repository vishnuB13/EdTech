const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    moduleName: { type: String, required: true },
    moduleDescription: { type:String,required: true},
    uploadedAt: { type: Date, default: Date.now },
    videoUrls: [{ type: String }], // Array of video URLs
    moduleImage: { type: String }, // Module image URL
    tutorCreated: { type: String, default: false }, // Indicates if the module was created by a tutor
    isApproved: { type: String, default:false, required:true },
    categoryName: { type: String, required: true},
    courseName: {type: String, required: true},
    actualPrice: {type:String}
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
