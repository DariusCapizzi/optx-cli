'use strict'

const fs = require('fs')
const Bluebird = require('bluebird')
Bluebird.promisifyAll(fs)

const Optx = require('optimizely-x-node')
const AuthFlow = require('../utils/AuthFlow')

function writeProject (obj) {
  return fs.writeFileAsync('project.json', JSON.stringify(obj, null, 2))
}

module.exports = {
  findOrCreate: function (projectId) {
    return AuthFlow.check()
      .then(config => {
        const Optimizely = new Optx({ token: config.access_token })
        return Optimizely.Project.read(projectId)
      })
      .then(resp => {
        if (resp.statusCode !== 200) throw new Error('Error reading project')
        return writeProject(resp.body)
      })
  },

  findAll: function () {
    return AuthFlow.check()
      .then(config => {
        const Optimizely = new Optx({ token: config.access_token })
        return Optimizely.Project.list()
      })
      .then(resp => {
        if (resp.statusCode !== 200 || !resp.body || !Array.isArray(resp.body)) throw new Error('Error reading projects')
        return resp.body.map(project => {
          return {
            id: project.id,
            name: project.name
          }
        })
      })
  }
}
