const { query } = require("../db/connection");
const db = require("../db/connection");
const format = require("pg-format");
const parks = require("../db/data/test-data/parks");

exports.selectParks = async () => {
  const parks = await db.query(`SELECT * FROM parks`);
  return parks.rows;
};

exports.selectParksById = async (park_id) => {
  const parkById = await db.query(`SELECT * FROM parks WHERE park_id =$1`, [
    park_id,
  ]);

  console.log(parkById.rows);
  return parkById.rows[0];
};
