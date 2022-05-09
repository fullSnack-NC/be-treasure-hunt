const user_activityRouter = require('express').Router();
const express = require('express');
const format = require('pg-format');
const { patchUAByUserID } = require('../controllers/user_activity.controller');

user_activityRouter.route('/:user_id').patch(patchUAByUserID);

module.exports = user_activityRouter;
