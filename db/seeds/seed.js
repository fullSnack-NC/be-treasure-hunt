const format = require('pg-format');
const { createRef, formatParks } = require('../helpers/utils');
const db = require('../connection');
const { dropTables, createTables } = require('../helpers/manage-tables');

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

	const townsIdLookup = createRef(townsRows, 'town_name', 'town_id');

	const formattedParks = formatParks(parksData, townsIdLookup);

	console.log(formattedParks);

	const insertParksQueryStr = format(
		`
		    INSERT INTO parks (town_id, park_name, parks_lat, parks_long, amenities)
		    VALUES %L RETURNING *;
		    `,
		formattedParks.map(
			({ town_id, park_name, parks_lat, parks_long, amenities }) => [
				town_id,
				park_name,
				parks_lat,
				parks_long,
				amenities,
			]
		)
	);
	return db.query(insertParksQueryStr).then((result) => {
		console.log(result.rows);
		return result.rows;
	});
};

module.exports = seed;
