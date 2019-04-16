const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');



// setting up the middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));

//bringing the required database models
const {userRegModel2} = require('../models/userRegistrationModel2');

//get route for login
router.get('/login',(req,res)=>{
    res.status(200).send('Get route for user login...');
})

//post route for login
router.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

     userRegModel2.findOne({'email':email},(err,user)=>{
        if(err) return err;
        else{
            if(!user){
                res.status(404).send('User not found....');
            }
            else{
                bcrypt.compare(password,user.password,(err,valid)=>{
                    if(err) throw err;
                    else{
                        if(valid){
                            //the supersecret should be changed later
                            var token = jwt.sign(user._id.toHexString(),'supersecret');
                            res.cookie('userLoginToken',token)
                            res.status(200).send('Cookie set '+token+' Login success...');   
                        }
                        else{
                            res.send('Error in username or password..')
                        }
                    }
                })
            }
        }
    })
})


// exporting the route
module.exports = router;