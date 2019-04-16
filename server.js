const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');



//bringing all the routes
const userReg1 = require('./user/registration1');
const userReg2 = require('./user/registration2');
const login = require('./user/login');
const profile = require('./user/profile');
const logout = require('./user/logout');
const post = require('./user/post');

// intializing the app
const app = express();

//bringing the connection URL:(should be hidden when made public)
const Connection_URL = 'mongodb://vsrnitp:Hello12345@ds229186.mlab.com:29186/clgambsdr';

// connecting to the database
mongoose.connect(Connection_URL,{ useNewUrlParser: true })
.then(()=>{
    console.log('Database connected....')
})



// creating the home route
app.get('/',(req,res)=>{
    res.status(200).send('I am home route and i am working fine...');
})

//creating the registration route (one) for clients
//PUBLIC
app.use('/auth/one',userReg1);

//creating the registration route (two) for clients
//PUBLIC
app.use('/auth/two',userReg2);

//creating the login route for the users
//PUBLIC
app.use('/auth',login);

//creating the profile dashbord for each user
//PRIVATE
app.use('/user',profile);

//creating the logout route for user
//PRIVATE
app.use('/logout',logout);

//creating the route for getting all the feeds of user
//PRIVATE
app.use('/post',post);


// starting the server
const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server is up and running at port ${port}`);
})