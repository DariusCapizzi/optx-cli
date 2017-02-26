const winston = require('winston')
const Project = require('../resources/Project.js')

/**
 * Sets the optimizely API token in the current project folder.
 * @param  {String}   token     Optimizely API token
 */
module.exports = function (clientId, clientSecret) {
  return Project.list()
    .tap(console.log)
    .then(list => winston.log('info', 'Project list returned successfully'))
    .catch(err => winston.log('error', err.message))
}
