const fetch = require('node-fetch')
const parser = require('../parseResult')

function block (obj, args, context, info) {
  const { hash } = args
  return fetch('https://blockexplorer.com/api/block/'+hash+'')
  .then(parser('block'))
}

block.prototype.typing = () => 'block(hash: String): Block'

module.exports = block
