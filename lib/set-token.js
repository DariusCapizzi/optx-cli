const fs = require('fs')
const Bluebird = require('bluebird')
const promptly = require('promptly')
const writeConfig = require('./write-config')

module.exports = function(token) {
  return new Bluebird((resolve, reject) => {
    if (token) return resolve(writeConfig('token', token))
    promptly.prompt('Enter Your Optimizely X Token (hidden): ', {
      'trim': true,
      'silent': true
    })
      .then(token => writeConfig('token', token))
      .catch(err => reject(err))
  })
}
