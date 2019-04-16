// this file will contain a program that will only run whenever we need to conduct 
// the election

// logic to conduct the election collegewise at a particular time....
// This route will work only on some specific time period

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
const {postTextModel} = require('../models/postTextModel');
const {postDocModel} = require('../models/postDocModel');
const {userSpecificTotalLikeCountModel} = require('../models/userSpecificTotalLikeCount');
const {voteCountModel} = require('../models/voteCountForElection');
const {elligibleCandidateListModel} = require('../models/elligibleCandidateListModel');

//setting up the route to count the five highest liked posts from each college

router.get('/stars',(req,res)=>{
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
                     //res.status(200).send('Everything is fine....')
                     userSpecificTotalLikeCountModel.find({"collegeName":user.collegeName}).sort({"likes":-1}).limit(5)
                     .then(data=>{
                         //here we have the data of the top five performer from each collage....
                         //USING NODE MAILER FOR SENDING MAIL TO ALL THE ELLIGIBLE CANDIDATES.....
/*************NODEMAILER CODE HERE********************** */
                         //res.status(200).send(data);
                         var doc = [];
                        for(var i =0;i<data.length;i++)
                        {
                            doc[i] = data[i].email
                            // elligibleCandidateListModel.findOne({"email":doc[i]},(err,user)=>{
                            //     if(err) console.log(err)
                            //     else{
                            //         if(!user){
                            //              // saving the emails of elligible candidates
                            //              const elligibles = new elligibleCandidateListModel({
                            //                  email:doc[i]
                            //              })
                            //             elligibles.save();
                            //         }
                            //         else{
                            //             console.log('vault already created...')
                            //         }
                            //     }
                            // })
                            }
                         res.status(200).redirect(
                            url.format({
                                pathname:"/election/vote",
                                query: {
                                 "firstContestent" : doc[0],
                                 "secondContestent" : doc[1],
                                 "thirdContestent" : doc[2],
                                 "fourthContestent" : doc[3],
                                 "fifthContestent" : doc[4],
                                 }
                              })
                         )
                     })
                     .catch(err => console.log(err))
                 }
             }
         })
     }
 })
})

//get route for election/vote
router.get('/vote',(req,res)=>{
    res.send('Get route for voting to chose your favourite ambassador...')
    //here the list of all five contestents will be available at the frontend....
    console.log(req.query.firstContestent)
})

//Post route to vote for selecting the ambassador..
router.post('/vote',(req,res)=>{
    //voting logic at the backend
    //here user will provide the data that to whoever candidate he wishes to vote from a form at the frontend

    
})

module.exports = router;

