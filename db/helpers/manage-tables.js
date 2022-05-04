const db = require('../connection');

const createTables = async () => {
	const townsTablePromise = db.query(`
  CREATE TABLE towns (
    town_id SERIAL PRIMARY KEY,
    town_name VARCHAR NOT NULL,
    region VARCHAR

  );`);

	const usersTablePromise = db.query(`
  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR

  );`);

	await Promise.all([townsTablePromise, usersTablePromise]);

	const parksTablePromise = db.query(`
  CREATE TABLE parks (
    park_id SERIAL PRIMARY KEY,
    town_id INT NOT NULL REFERENCES towns(town_id),
    park_name VARCHAR NOT NULL,
    parks_lat DECIMAL NOT NULL,
    parks_long DECIMAL NOT NULL,
    amenities VARCHAR NOT NULL
  );`);

	await Promise.all([parksTablePromise]);

	//Count for total ammount of hunts on parks

	const mapsTablePromise = db.query(`
  CREATE TABLE maps (
    map_id SERIAL PRIMARY KEY,
    park_id INT NOT NULL REFERENCES parks(park_id),
    length DECIMAL NOT NULL,
    est_comp_time INT NOT NULL,
    age_min INT NOT NULL
  );`);

	await Promise.all([mapsTablePromise]);

	//Count for total ammount of waypoints on maps

	await db.query(`
  CREATE TABLE waypoints (
    waypoint_id SERIAL PRIMARY KEY,
    map_id INT NOT NULL REFERENCES maps(map_id),
    waypoint_lat DECIMAL NOT NULL,
    waypoint_long DECIMAL NOT NULL,
    waypoint_timestamp TIMESTAMP NOT NULL,
    waypoint_ele DECIMAL,
    image VARCHAR
  );`);

	await db.query(`
  CREATE TABLE user_activity (
    activity_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    badges TEXT,
    maps_attempted INT, 
    maps_completed INT
  );`);
};

const dropTables = async () => {
	await db.query(`DROP TABLE IF EXISTS waypoints`);
	await db.query(`DROP TABLE IF EXISTS maps`);
	await db.query(`DROP TABLE IF EXISTS parks`);
	await db.query(`DROP TABLE IF EXISTS user_activity`);
	await db.query(`DROP TABLE IF EXISTS users`);
	await db.query(`DROP TABLE IF EXISTS towns`);
};

module.exports = { createTables, dropTables };
