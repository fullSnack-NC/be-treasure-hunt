const townsRouter = require("express").Router();
const express = require("express");
const format = require("pg-format");
const { getParksByTownId } = require("../controllers/towns.controller");

townsRouter.route("/:town_id/parks").get(getParksByTownId);

module.exports = townsRouter;
