const _ = require('lodash');
const taskModel = require('../models/tasks');
const data =  require('../data/tasks');

// Display all the tasks
exports.list_tasks = async (req, res) => {
    console.log('listing your tasks of today')
    const tasks =  await taskModel.find({});
    try {
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createTasks = async (req, res) => {
    const task = new taskModel(req.body);

    try{
        await task.save();
        res.send(task);
    } catch(error) {
        res.status(500).send(error);
    }
};

// retrieve a task by ID
exports.retreiveTask = async (req, res) => {
    try {
        const taskId = req.params.taskId
        console.log(taskId)
        const task = await taskModel.find({_id: taskId});
        res.send(task);
    } catch(error) {
        res.status(500).send(error);
    }
};