const winston = require('winston')
const setToken = require('../set-token.js')

/**
 * Sets the optimizely API token in the current project folder.
 * @param  {String}   token     Optimizely API token
 */
module.exports = function(token) {
  setToken(token)
    .then(() => winston.log('info', 'Token successfully set'))
    .catch(err => winston.log('error', err.message))
}
