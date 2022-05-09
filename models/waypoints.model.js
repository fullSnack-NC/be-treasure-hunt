const { query } = require('../db/connection');
const db = require('../db/connection');
const format = require('pg-format');
const parks = require('../db/data/test-data/waypoints');

exports.selectWaypointByMapId = async (map_id) => {
  const waypointByMapId = await db.query(
    `SELECT * FROM waypoints WHERE map_id =$1;`,
    [map_id]
  );
  if (waypointByMapId.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Park not found' });
  }
  return waypointByMapId.rows;
};
