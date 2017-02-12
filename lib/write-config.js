const fs = require('fs')
const Bluebird = require('bluebird')

module.exports = (name, value) => {
  return new Bluebird((resolve, reject) => {
    try {
      if (!fs.existsSync('.optx-cli')) {
        fs.mkdir('.optx-cli')
      }
      fs.writeFile(`.optx-cli/${name}`, value)
      return resolve(value)
    } catch (e) {
      return reject(e)
    }
  })
}
