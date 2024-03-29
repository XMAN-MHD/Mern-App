// import packages & files
const express = require('express'); // express
const taskControllers = require('../controllers/taskControllers') // tasks controllers
const protect = require('../middlewares/authMiddleware') // jwt use a token to protect our routes with authentication

// create a router
const router = express.Router(); 

// get tasks
router.get('/', protect, taskControllers.getTasks); 

// create tasks
router.post('/', protect, taskControllers.createTasks)

// update tasks
router.put('/:id', protect, taskControllers.updateTasks)

// delete tasks
router.delete('/:id', protect, taskControllers.deleteTasks)

// exports
module.exports = router;