const { query } = require('../db/connection');
const db = require('../db/connection');
const format = require('pg-format');

exports.selectParkByTownId = async (town_id) => {
	return town_id;
};

//Not MVO end point can come back to
