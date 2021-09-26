const express = require('express');
const usersRouter = require('../server/routers/usersRouter');
const cors = require('cors');

let app = express();

app.use(cors());

require('./config/database');

app.use(express.json());

app.use('/api/users', usersRouter)

app.use((err, req, res, next) => {
    return res.status(500).json({ error: err.toString() });
});
app.listen(8000);
