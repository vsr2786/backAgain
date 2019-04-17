const mongoose = require('mongoose');

const ambassadorPostostTextSchema = mongoose.Schema({
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
    //like feature can be implemented later for ambassador community
   /* likes:{
        type:Number,
        default:0
    }*/
});

const ambassadorPostostTextModel = mongoose.model('ambassadorPostostTextModel',ambassadorPostostTextSchema);

module.exports = {ambassadorPostostTextModel}