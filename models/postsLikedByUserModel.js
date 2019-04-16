const mongoose = require('mongoose');

const postLikedByUserSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    }
})

const postLikedByUserModel = mongoose.model('postLikedByUserModel',postLikedByUserSchema);

module.exports = {postLikedByUserModel}