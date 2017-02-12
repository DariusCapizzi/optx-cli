const fs = require('fs')
const Bluebird = require('bluebird')
Bluebird.promisifyAll(fs)

module.exports = (config) => {
  return new Bluebird((resolve, reject) => {
    fs.readFileAsync(`.optcli/${config}`, 'utf-8')
      .then(result => resolve(result))
      .catch(err => reject(new Error(err, `${config} is not set.`)))
  })
}
