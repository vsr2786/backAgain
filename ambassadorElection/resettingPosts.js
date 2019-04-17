// this code has not been imported anywhere
// this code will run nce a year to reset 
// isElligbleForElection:false
// isAmbassador:false
//this should be used very carefully....

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const url = require('url'); 


// setting up the middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));

//bringing the required database models
const {userRegModel2} = require('../models/userRegistrationModel2');

router.get('/reset',(req,res)=>{
    userRegModel2.updateMany({"isElligbleForElection":true},{$set: {"isElligbleForElection":false,"isAmbassador":false}},{multi:true})
    .then()
    .catch(err => console.log(err))
    res.send('Formatted successfully....');
})

module.exports = router;