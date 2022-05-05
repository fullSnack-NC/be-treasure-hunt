const { query } = require("../db/connection");
const db = require("../db/connection");
const format = require("pg-format");

exports.selectParkByTownId = (town_id) => {
  return town_id;
};
