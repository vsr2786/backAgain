const mongoose = require('mongoose');

const postTextSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    postData:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
        required:true
    },
    dateOfPost:{
        type:Date,
        default:Date.now()
    },
    likes:{
        type:Number,
        default:0
    }
});

const postTextModel = mongoose.model('postTextModel',postTextSchema);

module.exports = {postTextModel}
