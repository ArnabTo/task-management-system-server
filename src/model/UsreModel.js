const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    occupation: String,
    image: String
});

const Users = mongoose.model('Users', userSchema, 'userCollection');
module.exports = Users;