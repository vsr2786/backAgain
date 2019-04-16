const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// setting up the middleware
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

//bringing the database models
const {userRegModel2} = require('../models/userRegistrationModel2');
const {userRegModel1} = require('../models/userRegistartionModel1');


//get route for second step of registration
router.get('/register',(req,res)=>{
    res.status(200).send('This is the get route for second step of form registration');
   //passing the email from the first step of registration to th esecond step
    console.log(req.query.email);
    console.log(req.query.collegeName);
    // so the email will be auto filled in the next step step of form
})


//post route to take the form data of second step
router.post('/register',(req,res)=>{
    //res.status(200).send('This is the post route for second step of form registration');
    var userDataTwo = new userRegModel2({
        email:req.body.email,
        collegeName:req.body.collegeName,
        name:req.body.name,
        roll:req.body.roll,
        branch:req.body.branch,
        year:req.body.year,
        password:req.body.password
    })

    //finding by email and then letting user do next step
userRegModel1.findOne({'email':req.body.email},(err,user)=>{
    if(err){
        res.send(err)
    }
    else if(!user){
        res.send('First step of registration is incomplete...')
    }
    else if (user){
        
//hashing the password before saving it and performing level one check

bcrypt.hash(userDataTwo.password,saltRounds,(err,hash)=>{
    if(err) throw err;
    else{
        userDataTwo.password = hash;
        
        // saving userdata data to the database
        userDataTwo.save((err,doc)=>{
            if(err) res.status(400).send(err);
            else{
                res.status(200).send('successfully created account...');
            }
        })

    }
})
    }
})  
})


// exporting the router
module.exports = router;