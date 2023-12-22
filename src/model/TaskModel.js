const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    email: String,
    priority: String,
    title: String,
    taskD: String,
    date: String,
    status: String
});

const Tasks = mongoose.model('Tasks', taskSchema, 'taskCollection');
module.exports = Tasks;