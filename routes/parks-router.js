const parksRouter = require('express').Router();
const express = require('express');
const format = require('pg-format');
const { getParks } = require('../controllers/parks.controller');

parksRouter.route('/').get(getParks);

module.exports = parksRouter;
