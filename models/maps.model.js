const { query } = require("../db/connection");
const db = require("../db/connection");
const format = require("pg-format");
const parks = require("../db/data/test-data/parks");

exports.selectMapsByParkId = async (park_id) => {
  const parkById = await db.query(`SELECT * FROM maps WHERE park_id =$1`, [
    park_id,
  ]);

  console.log(parkById.rows);
  return parkById.rows;
};
