const { query } = require("../db/connection");
const db = require("../db/connection");
const format = require("pg-format");
const maps = require("../db/data/test-data/maps");

exports.selectMapsByParkId = async () => {
  const parkById = await db.query(`SELECT * FROM maps;`);

  console.log(parkById.rows);
  return parkById.rows;
};
