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
const {listOfUserWhoPolledModel} = require('../models/listOfUserWhoPolled');


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
                            userRegModel2.findOneAndUpdate({"email":doc[i]},{"isElligbleForElection":true},(err,doc)=>{
                                if(err) console.log(err)
                            })
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
                      //here the list of all five contestents will be available at the frontend....
                     //console.log(req.query.firstContestent)
                     //or we can querry the userRegistrationModel2 to get if a candidate is elligible to stand in the election or not..
                        userRegModel2.find({"isElligbleForElection":true},(err,doc)=>{
                        if(err) res.send(err)
                         else{
                     res.send(doc);
                     }
                  })
                 }
             }
         })
     }
 })
})

//Post route to vote for selecting the ambassador..
router.post('/vote',(req,res)=>{
   
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
                 
                    //voting will be anonymous..voters data wont be tracked..
                    //voting logic at the backend
                    //from frontend the email of the selected candidate by the user should be send..
                 //here user will provide the data that to whoever candidate he wishes to vote from a form at the frontend and we will catch that from body
                const voteToWhome = req.body.email;
                listOfUserWhoPolledModel.findOne({"email":user.email},(err,data)=>{
                    if(err) res.send(err)
                    else if(!data){
                       // console.log('You can poll..');
                       //generating schema for a user who will poll and saving it...
                        const iPolled = new listOfUserWhoPolledModel({
                            email:user.email
                        })
                        iPolled.save().then().catch(err => console.log(err));

                        //incrementing the vote count for which the user has polled....
                        voteCountModel.findOneAndUpdate({"email":voteToWhome},{$inc:{votes:1}},(err,doc)=>{
                            if(err) res.send(err);
                            else{
                                voteCountModel.find({"collegeName":user.collegeName}).sort({"votes":-1}).limit(1)
                                .then(data => console.log(data))
                                .catch(err => console.log(errr))
                                res.send(user.email+' Successfully casted your vote to '+doc.email
                                +'how are your contestents performing:- data not provided yet.... '
                                );
                            }
                        })


                    }
                    else{
                        res.send('You have already polled .....');
                    }
                })
                }
            }
        })
    }
})
   
   
   
   
    
    
})

module.exports = router;

