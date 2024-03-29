// imports 
const asyncHandler = require('express-async-handler'); // to handle asyn await expression and eliminate try catch.
const bcrypt = require('bcryptjs'); // use to hash password after resgisteration
const jwt = require('jsonwebtoken'); // jsw create a token for protecting our routes with authentication
const userModel = require('../models/userModel'); // access to users data 

// register the user
const registerUser = asyncHandler(async(req, res) => { 
    // get the user data
    const {userName, userEmail, userPassword} = req.body;

    // error handling
    if (!userName || !userEmail || !userPassword) 
    {
        if (!userName) 
        {
            res.status(400);
            throw new Error( 'Please enter your name');
        }

        if(!userEmail) 
        {
          res.status(400);
          throw new Error( 'Please enter your email');
        }
        if(!userPassword) 
        {
          res.status(400);
          throw new Error( 'Please enter your password');
        }
    } 
        // try to get an existing user
    const existedUser = await userModel.findOne(
        {email: userEmail}
    );
        // send error when user already exists 
    if (existedUser) {
        res.status(400);
        throw new Error( 'User already exists');
    } 

    // hash the user's password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    //create the user.
    const newUser = await userModel.create({name: userName, email: userEmail, password: hashedPassword});
        // check errors 
    if (!newUser) 
    {
        res.status(400);
        throw new Error('Invalid user data');
    }

    // send response about the registration completed.
    res.status(200).json({_id: newUser.id, name: newUser.name, email: newUser.email, token: generateJWT(newUser.id)});
})

// log the user
const logUser = asyncHandler(async(req, res) => { 
    // data submitted by the user
    const {userEmail, userPassword} = req.body;

    // error handling
    if (!userEmail || !userPassword) 
    {
        if (!userEmail) 
        {
            res.status(400);
            throw new Error( 'Please enter your email');
        }
    
        if(!userPassword) 
        {
            res.status(400);
            throw new Error( 'Please enter your password');
        }
    } 

    // search the user in the database
    const user = await userModel.findOne({email: userEmail});

    // verify if the user exists and send a response
    if(user && (await bcrypt.compare(userPassword, user.password)))
    {
        res.status(200).json({_id: user.id, name: user.name, email: user.email, token: generateJWT(user.id)});
    }
    else
    {
        res.status(400); 
        throw new Error("Invalide user's data");
    }
})

// get the current user
const getUser = asyncHandler(async(req, res) => { 
    // get the current user
    const user = await userModel.findById(req.user.id);
    res.status(200).json({_id: user.id, name: user.name, email: user.email});
})

// function to create a json web token (jwt).
const generateJWT = (id) => jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: '5d'});

// exports
module.exports = { registerUser, logUser, getUser }