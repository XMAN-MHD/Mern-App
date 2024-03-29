// imports 
const mongoose = require('mongoose'); // mongoose

// create a schema 
const taskSchema = mongoose.Schema(
    {
        text: {
            type: String, 
            require:[true, 'Please add a text']
        },
        user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'users',
            require: [true, 'User ID required']
        }
    },
    {
        timestamps: true 
    }
);

// create a model
const taskModel = mongoose.model('Tasks', taskSchema);

// exports
module.exports = taskModel;