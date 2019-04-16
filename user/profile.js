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

//get route for profile dashbord
router.get('/profile',(req,res)=>{
    const token = req.cookies.userLoginToken;
    jwt.verify(token,'supersecret',(err,decode)=>{
        if(err){
            res.status(401).send('Unauthorized!..');
        }
        else{
            userRegModel2.findOne({"_id":decode},(err,user)=>{
                if(err) return err;
                else{
                    if(!user){
                        res.status(404).send('Login first....');
                    }
                    else{
                       userRegModel2.find({"collegeName":user.collegeName},(err,data)=>{
                           if(err) res.send(err);
                           else{
                               res.status(200).send(data+"*******************"+user);

                           }
                       })
                        
                    }
                }
            })
        }
    })
});


module.exports = router;