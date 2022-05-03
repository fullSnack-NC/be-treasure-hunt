const format = require("pg-format");
const { createRef } = require("../helpers/utils");
const db = require("../connection");
const { dropTables, createTables } = require("../helpers/manage-tables");

const seed = async ({
  townsData,
  usersData,
  parksData,
  mapsData,
  user_activityData,
}) => {
  await dropTables();
  await createTables();

  const insertTownsQueryStr = format(
    `
    INSERT INTO towns (town_name, region)
    VALUES %L RETURNING *;
    `,
    townsData.map(({ town_name, region }) => [town_name, region])
  );
  const townsPromise = db.query(insertTownsQueryStr).then((result) => {
    console.log(result.rows);
    return result.rows;
  });

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

  await Promise.all([townsPromise, usersPromise]);

  //   const insertParksQueryStr = format(
  //     `
  //     INSERT INTO parks (town_id, park_name, parks_lat, parks_long, amenities)
  //     VALUES %L RETURNING *;
  //     `,
  //     parksData.map(
  //       ({ town_id, park_name, parks_lat, parks_long, amenities }) => [
  //         town_id,
  //         park_name,
  //         parks_lat,
  //         parks_long,
  //         amenities,
  //       ]
  //     )
  //   );

  //   const parksRows = await db
  //     .query(insertParksQueryStr)
  //     .then((results) => results.rows);
};

module.exports = seed;
