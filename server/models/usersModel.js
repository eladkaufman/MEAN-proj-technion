const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, required: false, default: false}
})

const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}
})

const usersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
   
    street: {type: String, required: false, default: ''},
    city: {type: String, required: false, default: ''},
    zipcode: {type: Number, required: false, default: 0},
    todos: [{type: todoSchema, required: false}],
    posts: [{type: postSchema, required: false}]
})


module.exports = mongoose.model('users', usersSchema);