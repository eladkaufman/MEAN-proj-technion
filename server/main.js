const express = require('express');
const usersRouter = require('../server/routers/usersRouter');
const postsRouter = require('../server/routers/postsRouter');
const todosRouter = require('../server/routers/todosRouter');
const cors = require('cors');

let app = express();

app.use(cors());

require('./config/database');

app.use(express.json());

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/todos', todosRouter)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status = error.status || 500;
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  
app.listen(8000);
