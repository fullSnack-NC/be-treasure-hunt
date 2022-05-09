const { selectWaypointByMapId } = require("../models/waypoints.model.js");

exports.getWaypointByMapId = (req, res, next) => {
  const { map_id } = req.params;
  selectWaypointByMapId(req.body, map_id)
    .then((waypoint) => {
      res.status(200).send({ waypoint });
    })
    .catch((err) => next(err));
};
