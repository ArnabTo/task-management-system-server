const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: String
});

const Tasks = mongoose.model('Tasks', taskSchema, 'taskCollection');
module.exports = Tasks;