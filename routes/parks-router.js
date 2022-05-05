const parksRouter = require('express').Router();
const express = require('express');
const format = require('pg-format');
const { getParks, getParkById } = require('../controllers/parks.controller');

parksRouter.route('/').get(getParks);

parksRouter.route('/:park_id').get(getParkById);

module.exports = parksRouter;
