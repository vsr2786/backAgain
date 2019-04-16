const mongoose = require('mongoose');

const userRegSchema1 = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    collegeName:{
        type:String,
        required:true
    },
    //make it functinal once frontend is developed
    /*collegeId:{
            data: Buffer, 
            contentType:String  
    },*/
    collegeIdDataType:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const userRegModel1 = mongoose.model('userRegModel1',userRegSchema1);

module.exports = {userRegModel1};