const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const fs = require('fs');
const url = require('url'); 



// setting up the middleware
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

//bringing the user registration models
const {userRegModel1} = require('../models/userRegistartionModel1');



//get route for first step of registration 
router.get('/register/form1',(req,res)=>{
    res.status(200).send('This is the get route for first step of form registration');
})


//post route to take the form data of first step
router.post('/register/one',(req,res,next)=>{
    // res.status(200).send('This is the post route for first step of form registration');
    var userDataOne = new userRegModel1({
        email:req.body.email,
        collegeName:req.body.collegeName,
        collegeIdDataType:'image/png'
    })
    // var imgPath = req.body.imgPath
    // userDataOne.collegeId.data = fs.readFileSync(imgPath);
    // userDataOne.collegeId.contentType = 'image/png';

    userDataOne.save((err,doc)=>{
        if(err){
            res.status(302).send(err);
        }
        else{
            res.redirect(url.format({
                pathname:"/auth/two/register",
                query: {
                 email:req.body.email,
                 collegeName:req.body.collegeName
                 }
              }));
        }
    })
              

})





// exporting the router
module.exports = router;


