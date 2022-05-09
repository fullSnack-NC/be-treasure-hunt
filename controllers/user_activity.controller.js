const { updateUserActivity } = require('../models/user_activity.model.js');

exports.patchUAByUserID = (req, res, next) => {
	const { user_id } = req.params;
	updateUserActivity(req.body, user_id)
		.then((user) => {
			res.status(200).send({ user });
		})
		.catch((err) => next(err));
};
