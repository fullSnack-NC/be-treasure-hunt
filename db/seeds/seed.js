const format = "pg-format";
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

  const insertTownsQueryStr = format("INSERT INTO towns");
};
