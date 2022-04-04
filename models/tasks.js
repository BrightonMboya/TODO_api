const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },

    is_completed: {
        type: Boolean,
        required: true,
    },
});




const taskModel = mongoose.model("todo", taskSchema);

module.exports = taskModel;
