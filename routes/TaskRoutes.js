var express = require('express');
var taskManager = require('../controllers/taskManager');
var router = express.Router();

// listing all the tasks
router.get('/', taskManager.list_tasks)

// create a dummy task
router.post('/', taskManager.createTasks)

// retrieve a task by ID
router.get('/:taskId', taskManager.retreiveTask)

//delete
router.delete('/:taskId', taskManager.deleteTodo)

//update
router.put('/:taskId', taskManager.updateTodo)
//complete task
router.put('/complete/:taskId', taskManager.completeTodo)



// a GET route
router.get('/about', (req, res) => {
    res.send('This is a sample GET route')
})


module.exports = router;