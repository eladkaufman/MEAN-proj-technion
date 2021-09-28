const users = require('./usersModel');

exports.postTodo = (userId ,newTodo) => {
    return new Promise((resolve, reject) => {
        users.findById(userId, (err, res) => {
            if(err) {reject(err)} else {
                res.todos.push(newTodo);
                res.save((err) => {
                    (err) ? reject(err) : resolve("task added");
                })
            }
        })
    })
}


exports.putUser = (todoId) => {
    return new Promise((resolve, reject) => {
        users.findOne({'todos._id': todoId}, (err, res) => {
            if(err) {reject(err)} else {
                console.log(res.todos.id(todoId).completed)
                res.todos.id(todoId).completed = true;
                res.save((err) => {
                    (err) ? reject(err) : resolve(`task updated!`)
                })
            }
        })
    })
}