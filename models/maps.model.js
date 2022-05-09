const { query } = require('../db/connection');
const db = require('../db/connection');
const format = require('pg-format');

exports.selectMapsByParkId = async (park_id) => {
	const parkById = await db.query(`SELECT * FROM maps WHERE park_id =$1`, [
		park_id,
	]);

	if (parkById.rows.length === 0) {
		return Promise.reject({
			status: 404,
			msg: 'Park not found',
		});
	}
	return parkById.rows;
};
