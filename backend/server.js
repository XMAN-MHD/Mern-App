// import packages
const express = require('express'); // express
const dotenv = require('dotenv').config(); // dotenv
const taskRoutes = require('./routes/taskRoutes.js'); // routes for tasks
const userRoutes = require('./routes/userRoutes.js'); // routes for users
const { errorHandlingMiddleware } = require('./middlewares/errorMiddleware.js'); // funcion to handle errors
const connectDB = require('./mongodb connexion/database.js'); // function to connect to the DB

// access the DB
connectDB();

// create a server
const app = express();

// create a port
const port = process.env.PORT || 5000; 

// use json on the project
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// handle errors
app.use(errorHandlingMiddleware);
    
// start the server
app.listen(port, ()=>{console.log(`server is listening on port ${port}`)});
