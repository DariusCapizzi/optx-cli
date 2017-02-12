const fs = require('fs')
const Bluebird = require('bluebird')
const promptly = require('promptly')
const writeConfig = require('./write-config')

module.exports = function(token) {
  if (token) return writeConfig('token', token)

  return new Bluebird((resolve, reject) => {
    promptly.prompt('Enter Your Optimizely Token (hidden): ', {
      'trim': true,
      'silent': true
    })
      .then(token => writeConfig('token', token))
      .then(token => resolve(token))
      .catch(err => reject(err))
  })
}