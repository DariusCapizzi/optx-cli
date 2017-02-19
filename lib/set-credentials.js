const Bluebird = require('bluebird')
const promptly = require('promptly')
const writeConfig = require('./write-config')

module.exports = (name, type, token) => {
  return new Bluebird((resolve, reject) => {
    if (token) return resolve(writeConfig(type, token))
    return promptly.prompt(`Enter Your Optimizely X ${name} (hidden): `, {
      'trim': true,
      'silent': true
    })
      .then(token => resolve(writeConfig(type, token)))
      .catch(err => reject(err))
  })
}
