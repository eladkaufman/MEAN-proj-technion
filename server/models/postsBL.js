const users = require('./usersModel');

exports.getPosts = (userId) => {
    return new Promise((resolve, reject) => {
        users.findById(userId, (err, res) => {
            if(err) {reject(err)} else {
                resolve(res.posts)
            }
        })
    })
}

exports.addPost = (userId ,newPost) => {
    return new Promise((resolve, reject) => {
        users.findById(userId, (err, res) => {
            if(err) {
                
                reject(err)} 
            else {
                res.posts.push(newPost);
                res.save((err) => {
                    (err) ? reject(err) : resolve("posted");
                })
            }
        })
    })
}