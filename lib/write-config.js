const fs = require('fs')
const Bluebird = require('bluebird')

module.exports = (name, value) => {
  return new Bluebird((resolve, reject) => {
    try {
      if (!fs.existsSync('.optx')) {
        fs.mkdir('.optx')
      }
      fs.writeFile(`.optx/${name}`, value)
      return resolve(value)
    } catch (e) {
      return reject(e)
    }
  })
}
