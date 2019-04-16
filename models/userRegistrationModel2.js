const mongoose = require('mongoose');

const userRegSchema2 = mongoose.Schema({
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
   name:{
    type:String,
    required:true,
   },
   roll:{
       type:String,
       required:true
   },
   branch:{
    type:String,
    required:true
   },
   year:{
    type:String,
    required:true
   },
   password:{
       type:String,
       required:true
   }
})

const userRegModel2 = mongoose.model('userRegModel2',userRegSchema2);

module.exports = {userRegModel2};