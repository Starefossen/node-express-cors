'use strict';

const express = require('express');
const app = module.exports = express();

const cors = require('../').middleware;

// enabled cors headers
app.use(cors);

// normal route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// handle cors errors
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.code).send(err.toString());
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000'); // eslint-disable-line no-console
}
