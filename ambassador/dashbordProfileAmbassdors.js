const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');



// setting up the middlewares
router.use(cookieParser());
router.use(bodyParser.urlencoded({extended:false}));


//bringing the registration model of user
const {userRegModel2} = require('../models/userRegistrationModel2');



router.get('/ambassador',(req,res)=>{
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
                           res.send('WELCOME AMBASSADOR....Your details are.. '+possibleAmbassador);
                           
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
});


module.exports = router;