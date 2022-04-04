const _ = require("lodash");
const taskModel = require("../models/tasks");

// Display all the tasks
exports.list_tasks = async (req, res) => {
  console.log("listing your tasks of today");
  console.log(taskModel.title);
  const tasks = await taskModel.find();
  return res.status(200).json({
    success: true,
    data: {
      data: tasks,
    },
  });
  // try {
  //     res.send(tasks);
  // } catch (error) {
  //     res.status(500).send(error);
  // }
};

exports.createTasks = async (req, res) => {
  const taskTitle = req.body.title;
  const task = new taskModel(req.body);

  const isExisting = await taskModel.findOne({ title: taskTitle });
  if (isExisting) {
    return res.status(409).json({
      success: false,
      data: {
        message: "task already exists",
      },
    });
  }

  try {
    const todo = { ...req.body, is_completed: "false" };
    const task = await taskModel.create(todo);
    res.status(201).json({
      sucess: true,
      data: {
        message: "created successsfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      data: {
        message: error.message,
      },
    });
  }
};

// retrieve a task by ID
exports.retreiveTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    console.log(taskId);
    const task = await taskModel.find({ _id: taskId });
    res.send(task); //to change
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete
exports.deleteTodo = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await taskModel.findById({ _id: taskId });

  if (!task) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No task found",
      },
    });
  }

  await taskModel.findByIdAndDelete({ _id: taskId });
  return res.status(200).json({
    success: true,
    data: {
      message: "task deleted successfully",
    },
  });
};

//update
exports.updateTodo = async (req, res) => {
  const taskId = req.params.taskId;
  const todo = await taskModel.findById({ _id: taskId });

  if (!todo) {
    return res.status(400).json({
      success: false,
      data: {
        message: "No such task found",
      },
    });
  }

  const updatedTodo = await taskModel.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    data: {
      message: "Todo successfully updated",
    },
  });
};
