const express = require('express');
const prisonsRouter = require('../routes/prisonsRouter/prisonsRouter.js');
const prisonersRouter = require('../routes/prisonersRouter/prisonersRouter.js');

const configureMiddleware = require('../config/middleware.js');

const server = express();

configureMiddleware(server);

server.use('/api/prisons', prisonsRouter);
server.use('/api/prisoners', prisonersRouter);

module.exports = server;