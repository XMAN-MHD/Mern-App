// imports 
const mongoose = require('mongoose'); 

// function to connect to the DB
const connectDB = async() => {
    try {
        // access the DB
        const db = await mongoose.connect(process.env.MONGO_URI); 
        console.log(`MongoDB connected : ${db.connection.host} `)
    } catch (error) {
        console.log(error); 
        process.exit(1);
    }
} 

// exports
module.exports = connectDB;