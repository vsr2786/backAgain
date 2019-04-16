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
const {postDocModel} = require('../models/postDocModel');

// setting up the route to get the relevent (TEXT) posts in user's profile (all at once)
router.get('/all/text',(req,res)=>{
    const token = req.cookies.userLoginToken;
    jwt.verify(token,'supersecret',(err,decode)=>{
     if(err){
         res.status(401).send('Unauthorized!')
     }
     else{
         userRegModel2.findOne({"_id":decode},(err,user)=>{
             if(err) res.send(err);
             else{
                 if(!user){
                     res.status(404).send('login first');
                 }
                 else{
                     postTextModel.find({"collegeName":user.collegeName},(err,data)=>{
                         if(err) res.send(err);
                         else if (!data){
                             res.send('NO post has been made from this college...')
                         }
                         else{
                             res.status(200).send('List of Text posts.....'+data);
                         }
                     })
                 }
             }
         })
     }
 })
})

//setting up the route to post a new feed by a user(Only text feed no document)
router.post('/new/text',(req,res)=>{
    //res.send('This route will be used to post the data by the users....');
    const token = req.cookies.userLoginToken;
    jwt.verify(token,'supersecret',(err,decode)=>{
     if(err){
         res.status(401).send('Unauthorized!')
     }
     else{
         userRegModel2.findOne({"_id":decode},(err,user)=>{
             if(err) res.send(err);
             else{
                 if(!user){
                     res.status(404).send('login first');
                 }
                 else{
                     var post = new postTextModel({
                         email:user.email,
                         collegeName:user.collegeName,
                         postData:req.body.postData
                     })

                     post.save((err,doc)=>{
                         if(err) res.send(err)
                         else res.send(doc);
                     })
                 }
             }
         })
     }
 })
})

//setting up the route to post a new feed by a user(Only document feed , no text)
router.post('/new/doc',(req,res)=>{
    //res.send('This route will be used to post the data by the users....');
    const token = req.cookies.userLoginToken;
    jwt.verify(token,'supersecret',(err,decode)=>{
     if(err){
         res.status(401).send('Unauthorized!')
     }
     else{
         userRegModel2.findOne({"_id":decode},(err,user)=>{
             if(err) res.send(err);
             else{
                 if(!user){
                     res.status(404).send('login first');
                 }
                 else{
                    // res.send('Route to post the docs')
                     var post = new postDocModel({
                         email:user.email,
                         collegeName:user.collegeName
                     })

                     post.save((err,doc)=>{
                         if(err) res.send(err);
                         else res.status(200).send(doc);
                     })
                   
                 }
             }
         })
     }
 })
})

//setting up the route to get the new docs posted by therir collegemates.. (all at once)
router.get('/all/doc',(req,res)=>{
    const token = req.cookies.userLoginToken;
    jwt.verify(token,'supersecret',(err,decode)=>{
     if(err){
         res.status(401).send('Unauthorized!')
     }
     else{
         userRegModel2.findOne({"_id":decode},(err,user)=>{
             if(err) res.send(err);
             else{
                 if(!user){
                     res.status(404).send('login first');
                 }
                 else{
                     postDocModel.find({"collegeName":user.collegeName},(err,data)=>{
                         if(err) res.send(err);
                         else if (!data){
                             res.send('NO post has been made from this college...')
                         }
                         else{
                             res.status(200).send('List of docs.....'+data);
                         }
                     })
                 }
             }
         })
     }
 })
})


// route to read a particular post (TEXT POST)
router.get('/text/:id',(req,res)=>{
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
                     var textPostId = req.params.id;
                     postTextModel.findOne({"_id":textPostId},(err,doc)=>{
                         if(err) res.send(err);
                         else{
                             res.status(200).send(doc);
                         }
                     })
                 }
             }
         })
     }
 })
})

//route to download a doc post
router.get('/doc/:id',(req,res)=>{
    releaseEvents,send("The id of the document to be downloaded is "+req.params.id);
})

module.exports = router;