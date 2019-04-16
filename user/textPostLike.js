const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


// setting up the middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));

//bringing the database models
const {userRegModel2} = require('../models/userRegistrationModel2');
const {postTextModel} = require('../models/postTextModel');
const {postLikedByUserModel} = require('../models/postsLikedByUserModel');

//This route is going to be the route for liking a particular text post...
router.get('/textPost/:id',(req,res)=>{
    const token = req.cookies.userLoginToken;
    jwt.verify(token,'supersecret',(err,decode)=>{
     if(err){
         res.status(401).send('Unauthorized!')
     }
     else{
         userRegModel2.findOne({"_id":decode},(err,user)=>{
             if(err) return err;
             else{
                 if(!user){
                     res.status(404).send('login first');
                 }
                 else{
                    postLikedByUserModel.findOne({"userId":user._id,"postId":req.params.id},(err,doc)=>{
                        if(err) res.send(err)
                        else if(!doc){
                             postTextModel.findOneAndUpdate({"_id":req.params.id},{$inc:{likes:1}},(err,doc)=>{
                         if(err) res.send(err)
                         else{
                             var whichPostLikedByWhichUser = new postLikedByUserModel({
                                 userId:user._id,
                                 postId:req.params.id
                             })

                             whichPostLikedByWhichUser.save();
                             res.status(200).send('Successfully incremented likes...for post id '+req.params.id)
                         }
                     })
                    
                        }
                        else{
                            res.send('You have already liked the post....');
                        }
                    })
                    
                 }
             }
         })
     }
 })
})


module.exports = router;