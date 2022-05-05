const { selectParkByTownId } = require("../models/towns.model");

exports.getParksByTownId = (req, res, next) => {
  const { town_id } = req.params;
  selectParkByTownId(town_id)
    .then((parks) => {
      res.status(200).send({ parks });
    })
    .catch((err) => next(err));
};
