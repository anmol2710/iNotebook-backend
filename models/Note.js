const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

const NOTE = mongoose.model("NOTE" , noteSchema);

module.exports = NOTE;