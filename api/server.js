const express = require('express');
const prisonsRouter = require('../routes/prisonsRouter/prisonsRouter.js');
const prisonersRouter = require('../routes/prisonersRouter/prisonersRouter.js');
const usersRouter = require('../routes/usersRouter/usersRouter.js');

const configureMiddleware = require('../config/middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api/prisons', prisonsRouter);
server.use('/api/prisoners', prisonersRouter);
server.use('/api/users', usersRouter);

module.exports = server;