const mapsRouter = require("express").Router();
const express = require("express");
const format = require("pg-format");
const { getMapsParkById } = require("../controllers/maps.controller");

mapsRouter.route(`/:park_id`).get(getMapsParkById);

module.exports = mapsRouter;
