const mongoose = require('mongoose');

//both post as well as doc like count.....

const userSpecificTotalLikeCountSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    }
})

const userSpecificTotalLikeCountModel = mongoose.model('userSpecificTotalLikeCountModel',userSpecificTotalLikeCountSchema);

module.exports = {userSpecificTotalLikeCountModel}

