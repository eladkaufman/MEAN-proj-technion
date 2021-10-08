const express = require('express');
const router = express.Router();
const bl = require('../models/todosBL');

// GET
router.route('/:userId')
    .get(async (req, res, next) => {
        return res.json(await bl.getTodos(req.params.userId).catch(next));
    })
// POST
router.route('/:userId')
    .post(async (req, res, next) => {
        return res.json(await bl.postTodo(req.params.userId, req.body).catch(next));
    })

// PUT
router.route('/:todoId')
    .put(async (req, res, next) => {
        return res.json(await bl.putUser(req.params.todoId, req.body).catch(next));
    })

module.exports = router;