const apiRouter = require('express').Router();
const { Router } = require('express');
const { getApi } = require('../controllers/api.controllers');
const mapsRouter = require('./maps-router.js');
const parksRouter = require('./parks-router.js');
const user_activityRouter = require('./user_activity-router');
const waypointsRouter = require('./waypoints-router');

apiRouter.get('/', getApi);

apiRouter.use('/parks', parksRouter);
apiRouter.use('/maps', mapsRouter);
apiRouter.use('/user_activity', user_activityRouter);
apiRouter.use('/waypoints', waypointsRouter);

module.exports = apiRouter;
