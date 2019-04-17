// these routes will be accesible only by admins...
//this is most important of all route because collage ambassadors will be selected 
// through this route only by admins....

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
const {voteCountModel} = require('../models/voteCountForElection');

//setting up the array containing list of colleges..
const listOfColleges = ["National Institute of Technology , Patna"];

//setting up the route
router.get('/counting',(req,res)=>{
    //looping the list of colleges and assigning the ambassador to each of them...
    for(var i = 0;i<listOfColleges.length;i++){
        voteCountModel.find({"collegeName":listOfColleges[i]}).sort({"votes":-1}).limit(1)
        .then((data)=>{
            //console.log(data[0].email)
            userRegModel2.findOneAndUpdate({"email":data[0].email},{"isAmbassador":true},(err,doc)=>{
                res.send('Sucessfully set '+doc+' as ambassador for college '+listOfColleges[i])
            })
        })
        .catch(err => console.log(err))
    }
})


module.exports = router;