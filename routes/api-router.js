const apiRouter = require('express').Router();
const { getApi } = require('../controllers/api.controllers');
const parksRouter = require('./parks-router.js');

apiRouter.get('/', getApi);

apiRouter.use('/parks', parksRouter);

module.exports = apiRouter;
