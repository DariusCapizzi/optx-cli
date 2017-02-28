const winston = require('winston')
const Project = require('../resources/Project.js')

/**
 * Sets the optimizely API token in the current project folder.
 * @param  {String}   token     Optimizely API token
 */
module.exports = function () {
  return Project.findAll()
    .then(list => console.log('info', list))
    .catch(err => winston.log('error', err.message))
}
