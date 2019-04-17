const mongoose = require('mongoose');

const listOfUserWhoPolledSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:1
    },
    timeOfPolling:{
        type:Date,
        default:Date.now()
    }
})

const listOfUserWhoPolledModel = mongoose.model('listOfUserWhoPolledModel',listOfUserWhoPolledSchema);

module.exports = {listOfUserWhoPolledModel}