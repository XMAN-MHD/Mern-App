// imports 
const mongoose = require('mongoose');

// create a schema
const userSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            require: [true, "Please enter your name"]
        },
        email: {
            type: String, 
            require: [true, "Please enter your email"], 
            validate: {
                validator: function(value) {
                    // Check if email includes '@gmail.com'
                    return /\b@gmail\.com$/.test(value);
                },
                message: "Please enter a valid email address ending with '@gmail.com'"
            },
            unique: true
        }, 
        password: {
            type: String, 
            require: [true, "Please enter your password"]
        },
    },  
    {
        timestamps: true
    }
); 

// create the model
const userModel = mongoose.model('users', userSchema); 

// export
module.exports = userModel;
