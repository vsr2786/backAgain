const mongoose = require('mongoose');

const elligibleCandidateListSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:1
    }
})

const elligibleCandidateListModel = mongoose.model('elligibleCandidateListModel',elligibleCandidateListSchema);

module.exports = {elligibleCandidateListModel}