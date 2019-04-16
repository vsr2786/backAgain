const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');


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

    /****************NODEMAILER FROM HERE********** */    
        // creating transporter for nodemailer
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "monis.satidasani1@gmail.com", // generated ethereal user//host user email or admin email
              pass: "Jprm**#9" // generated ethereal password//admin password
            },tls:{
              rejectUnauthorised:true
            }
          });

                // setup email data with unicode symbols
           // var link="http://"+req.get('host')+"/verify?id="+u_email;//verification link or the path of the user
            let mailOptions = {
            from: '"nodemailer👻" <monis.satidasani1@gmail.com>', // sender address
            to: req.body.email, // list of receivers
            subject: "no_reply just verify your account to be our member", // Subject line
            text: "Hello world? Your mail is verified...", // plain text body
            };
            
            //sending the mail
            transporter.sendMail(mailOptions,function(err,info){
                if(err)
                console.log(err);
                else {
                  console.log("SUCCESS IN SENIDNG THE MAIL FROM NODE nodemailer");
                }
              });

              /*******************NODEMAILER ENDS HERE*************** */


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