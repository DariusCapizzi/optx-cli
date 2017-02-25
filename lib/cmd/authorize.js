const winston = require('winston')
const authorize = require('../authorize')

/**
 * Sets the optimizely API token in the current project folder.
 * @param  {String}   token     Optimizely API token
 */
module.exports = function () {
  return authorize()
    .then(() => winston.log('info', 'Authorization credentials successfully set'))
    .catch(err => winston.log('error', `${err.message}\n\nHave you set your Client ID and Client Secret with \`optx-cli set-client\`?`))
}
