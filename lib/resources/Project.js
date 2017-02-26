'use strict'

const Optx = require('optimizely-x-node')
const AuthFlow = require('../utils/AuthFlow')

module.exports = {
  list: function () {
    return AuthFlow.check()
      .then(config => {
        const Optimizely = new Optx({ token: config.access_token })
        return Optimizely.Project.list()
      })
  },

  findOne: function (projectId) {
    return AuthFlow.check()
      .then(config => {
        const Optimizely = new Optx({ token: config.access_token })
        return Optimizely.Project.read(projectId)
      })
  }
}
