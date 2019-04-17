// ambassadors will allowed only to post the text docs and that would be accesible only to th community of ambassadors..

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


// setting up the middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));

//bringing the required database models
const {userRegModel2} = require('../models/userRegistrationModel2');
const {ambassadorPostostTextModel} = require('../models/ambassadorTextPostModel');

// setting up the route to get(fetch) the post posted in ambassador community...

router.get('/all',(req,res)=>{
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
                    userRegModel2.findOne({"email":user.email},(err,possibleAmbassador)=>{
                     if(err) res.send(err)
                     else if(!possibleAmbassador){
                         res.send('You are not an ambassador.....');
                     }
                     else{
                         if(possibleAmbassador.isAmbassador === true){
                            // res.send('WELCOME AMBASSADOR......')
                            ambassadorPostostTextModel.find().then(data => res.send(data)).catch(err => console.log(err))
                            
                         }
                         else{
                             res.send('Sorry , you dont have an access to get to this route.....Accesible only for ambassadors...');
                         }
                     }
                    })
                 }
             }
         })
     }
 })
})

// setting up the route to post a data to the ambassadors feed by ambassadors
router.post('/new',(req,res)=>{
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
                    userRegModel2.findOne({"email":user.email},(err,possibleAmbassador)=>{
                     if(err) res.send(err)
                     else if(!possibleAmbassador){
                         res.send('You are not an ambassador.....');
                     }
                     else{
                         if(possibleAmbassador.isAmbassador === true){
                            // res.send('WELCOME AMBASSADOR......')
                            //creating the schema for new post by ambassadors....
                            const ambassadorPost = new ambassadorPostostTextModel({
                                email:possibleAmbassador.email,
                                postData:req.body.post,
                                collegeName:possibleAmbassador.collegeName
                            });
                            //saving the data to the database
                            ambassadorPost.save()
                            .then(data => res.send('Successfully posted.... '+data))
                            .catch(err => console.log(err))
                            
                         }
                         else{
                             res.send('Sorry , you dont have an access to get to this route.....Accesible only for ambassadors...');
                         }
                     }
                    })
                 }
             }
         })
     }
 })
})


module.exports = router;