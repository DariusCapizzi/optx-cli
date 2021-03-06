const winston = require('winston')
const Project = require('../resources/Project.js')

/**
 * Sets the optimizely API token in the current project folder.
 * @param  {String}   token     Optimizely API token
 */
module.exports = function (projectId) {
  return Project.findOrCreate(projectId)
    .then(list => winston.log('info', 'project.json generated successfully'))
    .catch(err => winston.log('error', err.message))
}
