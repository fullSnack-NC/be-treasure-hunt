const apiRouter = require("express").Router();
const { getApi } = require("../controllers/api.controllers");
const mapsRouter = require("./maps-router");
const parksRouter = require("./parks-router.js");

apiRouter.get("/", getApi);

apiRouter.use("/parks", parksRouter);
apiRouter.use("/maps", mapsRouter);

module.exports = apiRouter;
