const format = require("pg-format");
const {
  createRef,
  formatParks,
  formatMaps,
  formatWaypoints,
} = require("../helpers/utils");
const db = require("../connection");
const { dropTables, createTables } = require("../helpers/manage-tables");

const seed = async ({
  townsData,
  usersData,
  parksData,
  mapsData,
  user_activityData,
  waypointsData,
}) => {
  await dropTables();
  await createTables();

  const insertUsersQueryStr = format(
    `
    INSERT INTO users (username, email, password)
    VALUES %L RETURNING *;
    `,
    usersData.map(({ username, email, password }) => [
      username,
      email,
      password,
    ])
  );

  const usersPromise = db
    .query(insertUsersQueryStr)
    .then((results) => results.rows);

  await Promise.all([usersPromise]);

  const insertTownsQueryStr = format(
    `
    INSERT INTO towns (town_name, region)
    VALUES %L RETURNING *;
    `,
    townsData.map(({ town_name, region }) => [town_name, region])
  );
  const townsRows = await db.query(insertTownsQueryStr).then((result) => {
    return result.rows;
  });

  const townsIdLookup = createRef(townsRows, "town_name", "town_id");
  const formattedParks = formatParks(parksData, townsIdLookup);

  const insertParksQueryStr = format(
    `
		    INSERT INTO parks (town_id, park_name, parks_lat, parks_long)
		    VALUES %L RETURNING *;
		    `,
    formattedParks.map(({ town_id, park_name, parks_lat, parks_long }) => [
      town_id,
      park_name,
      parks_lat,
      parks_long,
    ])
  );
  const parksRows = await db.query(insertParksQueryStr).then((result) => {
    return result.rows;
  });

  const parksIdLookup = createRef(parksRows, "park_name", "park_id");
  const formattedMaps = formatMaps(mapsData, parksIdLookup);

  const insertMapsQueryStr = format(
    `
      INSERT INTO maps (park_id, map_name, length, est_comp_time, age_min)
      VALUES %L RETURNING *;
      `,
    formattedMaps.map(
      ({ park_id, map_name, length, est_comp_time, age_min }) => [
        park_id,
        map_name,
        length,
        est_comp_time,
        age_min,
      ]
    )
  );
  const mapRows = await db.query(insertMapsQueryStr).then((results) => {
    return results.rows;
  });

  const mapsIdLookup = createRef(mapRows, "map_name", "map_id");
  const formattedWaypoints = formatWaypoints(waypointsData, mapsIdLookup);

  const insertWaypointsQueryStr = format(
    `
      INSERT INTO waypoints (map_id, waypoint_lat, waypoint_long, waypoint_timestamp, waypoint_ele, image)
      VALUES %L RETURNING *;
      `,
    formattedWaypoints.map(
      ({
        map_id,
        waypoint_lat,
        waypoint_long,
        waypoint_timestamp,
        waypoint_ele,
        image,
      }) => [
        map_id,
        waypoint_lat,
        waypoint_long,
        waypoint_timestamp,
        waypoint_ele,
        image,
      ]
    )
  );
  return db.query(insertWaypointsQueryStr).then((results) => {
    console.log(results.rows, "<<<<");
    return results.rows;
  });
};

module.exports = seed;
