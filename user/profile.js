const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


// setting up the middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));

//get route for profile dashbord
router.get('/profile',(req,res)=>{
    res.status(200).send('This is the profile dashbord route for the user..(PRIVATE)')
});


module.exports = router;