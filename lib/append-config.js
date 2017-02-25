const fs = require('fs')
const Bluebird = require('bluebird')
const path = require('path')
Bluebird.promisifyAll(fs)

module.exports = (obj) => {
  return new Bluebird((resolve, reject) => {
    try {
      if (typeof obj !== 'object') throw new Error('Appended values must be sent as an object')
      if (!fs.existsSync(path.join(__dirname, '../.optx'))) {
        fs.mkdir(path.join(__dirname, '../.optx'))
      }
      if (!fs.existsSync(path.join(__dirname, '../.optx/config.json'))) {
        fs.writeFile(path.join(__dirname, '../.optx/config.json'), JSON.stringify({}))
      }
      return fs.readFileAsync(path.join(__dirname, '../.optx/config.json'), 'utf-8')
        .then(json => {
          let config = JSON.parse(json)
          return resolve(fs.writeFileAsync(path.join(__dirname, '../.optx/config.json'), JSON.stringify(Object.assign({}, config, obj), null, 2)))
        })
    } catch (e) {
      return reject(e)
    }
  })
}
