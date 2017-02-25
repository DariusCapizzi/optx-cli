const OptxOauth = require('optimizely-oauth2')()
const readConfig = require('./read-config.js')
const appendConfig = require('./append-config.js')

module.exports = () => {
  return readConfig()
    .then(config => OptxOauth.Authorize(config))
    .then(auth => {
      if (auth.statusCode !== 200 || !auth.body) {
        throw new Error(auth, 'Not successfully authorized')
      }
      return appendConfig(auth.body)
    })
}
