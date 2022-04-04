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


// module.exports = mongoose.model('rest', taskSchema);

const task = mongoose.model('rest', taskSchema);
