const fetch = require('node-fetch')
const parser = require('../parseResult')

function status (obj, args, context, info) {
  return fetch('https://blockexplorer.com/api/status')
  .then(parser('status'))
  .then(res => res.info)
}

status.prototype.typing = () => 'status: Status'

module.exports = status
