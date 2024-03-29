// imports 
const asyncHandler = require('express-async-handler'); // handle async await structure and eliminate try and catch
const taskModel = require('../models/taskModel'); // access to tasks data
const userModel = require('../models/userModel'); // access to users  data 

// get tasks
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await taskModel.find({user: req.user.id});

    // error handling
    if (!tasks) 
    {
        res.status(404); 
        throw new Error('Task(s) not found.')        
    }

    // send the tasks succesfully retrieved
    res.status(200).json(tasks);
})

// create tasks
const createTasks = asyncHandler(async (req, res) => {
    
    // error handling
    if(!req.body.text)
    {
        res.status(400);
        throw new Error('Task not created.');
    }
    
    // create a task
    const task = await taskModel.create({ text: req.body.text, user: req.user.id });
    res.status(201).json(task);
})

// update tasks
const updateTasks = asyncHandler(async(req, res) => {
    // get the task to update
    const task = await taskModel.findOne({_id: req.params.id}); 
   
    // error handling
    if(!task)
    {
        res.status(400);
        throw new Error('Task not found.');
    }

    // check if the user is authorize
    const user = await userModel.findOne({_id: req.user.id});
    if (!user) 
    {
        res.status(401);
        throw new Error('User not found.');
    }
    if (task.user.toString() !== user.id) 
    {
        res.status(401);
        throw new Error('User not authorized.');
    }

    // modify the current task
    const taskId = req.params.id;
    const newText = req.body.text;
    const updatedTask = await taskModel.updateOne({_id: taskId}, {$set: {text: newText}})

    // send response
    if (updatedTask.modifiedCount === 1) {
        res.status(200).json({message:`Task ${req.params.id} is updated`}); 
        
    } else {
        res.status(400).json({message:`Task ${req.params.id} not updated`});     
    }
})

// delete tasks
const deleteTasks = asyncHandler(async(req, res) => {
    // get the task to update
    const task = await taskModel.findOne({_id: req.params.id}); 
    
    // error handling
    if(!task)
    {
        res.status(400);
        throw new Error('Task not found.');
    }

    // check if the user is authorize
    const user = await userModel.findOne({_id: req.user.id});
    if (!user) 
    {
        res.status(401);
        throw new Error('User not found.');
    }
    if (task.user.toString() !== user.id) 
    {
        res.status(401);
        throw new Error('User not authorized.');
    }

    // delete the current task
    const taskId = req.params.id;
    const  deletedTask = await taskModel.deleteOne({_id: taskId});

    // check the deletion
    if (deletedTask.deletedCount === 0) {
        res.status(400);
        throw new Error(`Task ${taskId} not deleted.`);
    }
    else 
    {
        // send confirmation of the deletion
        res.status(200).json({ message: `Task ${taskId} deleted.` });
    }
})

module.exports = { getTasks, createTasks, updateTasks, deleteTasks }
