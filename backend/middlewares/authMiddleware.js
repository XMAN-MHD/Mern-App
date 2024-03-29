// imports 
const jwt = require('jsonwebtoken');  // create a token that will protect our routes with authication
const asyncHandler = require('express-async-handler'); // to handle asyn await expression and eliminate try catch.
const userModel = require('../models/userModel') // access the user model data ;

// function to protect our routes
const protect = asyncHandler(async (req, res, next) => {

let token;

if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

try {

token = req.headers.authorization.split(' ')[1]

const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

req.user = await userModel.findById(decoded.id).select('-password')

next()

} catch (error) {

console.log(error)

res.status(401)

throw new Error('You are not authorized')

}

}
if (!token) {

    res.status(401)
    
    throw new Error('Not authorized, no token')
    
}
})
module.exports = protect 