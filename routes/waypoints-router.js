const waypointsRouter = require('express').Router();
const express = require('express');
const format = require('pg-format');
const { getWaypointsByMapId } = require('../controllers/waypoints.controller');

waypointsRouter.route('/:map_id').get(getWaypointsByMapId);

module.exports = waypointsRouter;
