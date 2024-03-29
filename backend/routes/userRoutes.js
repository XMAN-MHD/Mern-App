// imports
const express = require('express'); // express to handle our server.
const userControllers = require('../controllers/userController'); // user's routes handlers 
const protect = require("../middlewares/authMiddleware"); // // jwt use a token to protect our routes with authentication

//create a router 
const router = express.Router(); 

// route to register the user
router.post('/register', userControllers.registerUser);

// route to log the user
router.post('/login', userControllers.logUser);  

// route to get the current user
router.get('/current', protect, userControllers.getUser);  

// exports 
module.exports = router;