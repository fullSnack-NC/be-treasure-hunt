const { query } = require('../db/connection');
const db = require('../db/connection');
const format = require('pg-format');

exports.updateUserActivity = async (newUA, user_id) => {
	const { badges, maps_attempted, maps_completed } = newUA;

	if (
		typeof maps_attempted !== 'number' ||
		typeof maps_completed !== 'number'
	) {
		return Promise.reject({
			status: 422,
			msg: 'Unprocessable Entity- Please provide correct format',
		});
	}
	const queryReturn = await db.query(
		` UPDATE user_activity SET badges = $1 , maps_attempted  = $2, maps_completed = $3 WHERE user_id = $4 RETURNING *;`,
		[badges, maps_attempted, maps_completed, user_id]
	);
	if (queryReturn.rows.length === 0) {
		return Promise.reject({
			status: 404,
			msg: 'User not found',
		});
	}
	return queryReturn.rows;
};
