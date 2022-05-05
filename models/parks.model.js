const { query } = require('../db/connection');
const db = require('../db/connection');
const format = require('pg-format');

exports.selectParks = async () => {
	const parks = await db.query(`SELECT * FROM parks`);
	console.log(parks);
	return parks.rows;
};
