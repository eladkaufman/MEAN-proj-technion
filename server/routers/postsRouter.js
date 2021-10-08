const express = require('express');
const router = express.Router();
const bl = require('../models/postsBL');


// GET
router.route('/:userId')
    .get(async (req, res, next) => {
        return res.json(await bl.getPosts(req.params.userId).catch(next));
    })


router.route('/:userId')
    .post(async (req, res, next) => {
        return res.json(await bl.addPost(req.params.userId, req.body).catch(next));
    })

module.exports = router;