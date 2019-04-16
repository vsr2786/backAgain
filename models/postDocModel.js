const mongoose = require('mongoose');

const postDocSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    //implement it once the frontend is ready
   /* postData:{
        type:Buffer,
        required:true,
        contentType:String
    },*/
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

const postDocModel = mongoose.model('postDocModel',postDocSchema);

module.exports = {postDocModel}
