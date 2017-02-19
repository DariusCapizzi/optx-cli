const fs = require('fs')
const Bluebird = require('bluebird')
const path = require('path')
Bluebird.promisifyAll(fs)

module.exports = (key, value) => {
  return new Bluebird((resolve, reject) => {
    try {
      if (!fs.existsSync(path.join(__dirname, '../.optx'))) {
        fs.mkdir(path.join(__dirname, '../.optx'))
      }
      if (!fs.existsSync(path.join(__dirname, '../.optx/config.json'))) {
        fs.writeFile(path.join(__dirname, '../.optx/config.json'), JSON.stringify({}))
      }
      return fs.readFileAsync(path.join(__dirname, '../.optx/config.json'), 'utf-8')
        .then(json => {
          let config = JSON.parse(json)
          config[key] = value
          return resolve(fs.writeFileAsync(path.join(__dirname, '../.optx/config.json'), JSON.stringify(config, null, 2)))
        })
    } catch (e) {
      return reject(e)
    }
  })
}
