const mongoose = require('mongoose');

const voteCountSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:1
    },
    votes:{
        type:Number,
        default:0
    }
})

const voteCountModel = mongoose.model('voteCountModel',voteCountSchema);

module.exports = {voteCountModel}