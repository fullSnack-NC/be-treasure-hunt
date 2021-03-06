const { fetchApi } = require('../models/api.model.js');

exports.getApi = (req, res, next) => {
	fetchApi()
		.then((file) => {
			res.status(200).send({ file });
		})
		.catch((err) => next(err));
};
