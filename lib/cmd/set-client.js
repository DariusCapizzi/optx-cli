const winston = require('winston')
const setCredentials = require('../set-credentials.js')

/**
 * Sets the optimizely API token in the current project folder.
 * @param  {String}   token     Optimizely API token
 */
module.exports = function (clientId, clientSecret) {
  return setCredentials('Client ID', 'clientId', clientId)
    .then(() => setCredentials('Client Secret', 'clientSecret', clientSecret))
    .then(() => winston.log('info', 'Client ID and Client Secret successfully set'))
    .catch(err => winston.log('error', err.message))
}
