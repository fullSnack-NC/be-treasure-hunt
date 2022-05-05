const mapsRouter = require("express").Router();
const express = require("express");
const format = require("pg-format");
const { getMapsParkById } = require("../controllers/maps.controller");

mapsRouter.route(`/parks/${park_id}/maps`).get(getMapsParkById);

module.exports = mapsRouter;
