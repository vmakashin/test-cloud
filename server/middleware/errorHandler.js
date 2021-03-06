const logger = require('../logger');
const { isDev } = require('../../utils');

// custom error handler for the app/api
// only include error stack in development mode
// eslint-disable-next-line no-unused-vars
const errorHandler = ({ json = false } = {}) => (err, req, res, next) => {
  const code = err.statusCode || 500;
  const stack = isDev ? err.stack : null;
  const error = isDev ? err.message : 'Sorry! Something went wrong.';
  const errorData = { code, error, stack };

  res.status(code);

  // logs error stack
  logger.error(err.stack);

  // giving erros in JSON format if request made via Ajax or `json` key is true
  // otherwise, rendering 500 template with passed params
  if (req.xhr || !!json) {
    res.json(errorData);
  } else {
    res.send('500 Internal Server Error.');
  }
};

module.exports = errorHandler;
