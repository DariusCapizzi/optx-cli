'use strict'

const readConfig = require('../utils/read-config')
const setCredentials = require('../set-credentials.js')
const authorize = require('../authorize.js')
const refresh = require('../refresh.js')

module.exports = {
  check: function () {
    return readConfig()
      .then(config => {
        if (!config.access_token && !config.refresh_token) {
          return this.fullFlow(config)
            .then(auth => console.log(auth))
        }
        if (!config.access_token && config.refresh_token) {
          return refresh()
            .then(() => readConfig())
            .then(auth => console.log(auth))
        }
        return config
      })
  },

  fullFlow: function (config) {
    return setCredentials('Client ID', 'clientId', config.clientId || config.client_id)
      .then(() => setCredentials('Client Secret', 'clientSecret', config.clientSecret || config.client_secret))
      .then(() => authorize())
      .then(() => readConfig())
      .then(auth => console.log(auth))
  }
}
