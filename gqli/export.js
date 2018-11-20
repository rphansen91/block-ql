
const fs = require('fs')
const path = require('path')

module.exports = (dirname) => {
  return fs.readdirSync(dirname)
  .map(f => f.replace('.js', ''))
  .filter(f => f !== 'index')
  .reduce((mod, f) => {
    mod[f] = require(path.resolve(dirname, f))
    return mod
  }, {})
}
