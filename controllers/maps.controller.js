const { selectMapsByParkId } = require('../models/maps.model');

exports.getMapsParkById = (req, res, next) => {
	const { park_id } = req.params;

	selectMapsByParkId(park_id)
		.then((maps) => {
			res.status(200).send({ maps });
		})
		.catch((err) => next(err));
};
