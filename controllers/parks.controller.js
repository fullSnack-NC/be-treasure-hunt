const { selectParks, selectParksById } = require('../models/parks.model');

exports.getParks = (req, res, next) => {
	selectParks()
		.then((parks) => {
			res.status(200).send({ parks });
		})
		.catch((err) => next(err));
};

exports.getParkById = (req, res, next) => {
	const { park_id } = req.params;
	selectParksById(park_id)
		.then((parks) => {
			res.status(200).send({ parks });
		})
		.catch((err) => next(err));
};
