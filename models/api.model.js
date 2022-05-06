const { query } = require('../db/connection');
const db = require('../db/connection');
const format = require('pg-format');
const fs = require('fs/promises');

exports.fetchApi = async () => {
	const file = await fs.readFile('endpoints.json', 'utf8');
	return file;
};
