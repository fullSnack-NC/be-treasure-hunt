const express = require('express');
const apiRouter = require('./routes/api-router');
const app = express();
const cors = require('cors');
const {
  psqlErrors,
  nonPsqlErrors,
  internalServerError,
} = require('./controllers/err.controller');
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Path not found' });
});
app.use(psqlErrors);
app.use(nonPsqlErrors);
app.use(internalServerError);

module.exports = app;
