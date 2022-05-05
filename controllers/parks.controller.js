const { selectParks } = require('../models/parks.model');

exports.getParks = (req, res, next) => {
	selectParks()
		.then((parks) => {
			res.status(200).send({ parks });
		})
		.catch((err) => next(err));
};
