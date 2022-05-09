const { query } = require("../db/connection");
const db = require("../db/connection");
const format = require("pg-format");
const parks = require("../db/data/test-data/parks");

exports.selectWaypointByMapId = async (map_id) => {
  const waypointByMapId = await db.query(
    `SELECT * FROM waypoints WHERE map_id =$1;`,
    [map_id]
  );
  return waypointByMapId.rows;
};
