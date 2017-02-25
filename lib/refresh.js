const OptxOauth = require('optimizely-oauth2')()
const readConfig = require('./utils/read-config.js')
const appendConfig = require('./utils/append-config.js')

module.exports = () => {
  return readConfig()
    .then(config => OptxOauth.Refresh(config))
    .then(auth => {
      if (auth.statusCode !== 200 || !auth.body) {
        throw new Error(auth, 'Not successfully authorized')
      }
      return appendConfig(auth.body)
    })
}
