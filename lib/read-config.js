const fs = require('fs')
const Bluebird = require('bluebird')
Bluebird.promisifyAll(fs)

module.exports = () => {
  return new Bluebird((resolve, reject) => {
    fs.readFileAsync(`.optcli/config.json`, 'utf-8')
      .then(result => resolve(JSON.parse(result)))
      .catch(err => reject(new Error(err, `Configuration file is not correctly set.`)))
  })
}
