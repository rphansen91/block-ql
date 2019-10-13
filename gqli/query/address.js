const fetch = require('node-fetch')
const parser = require('../parseResult')

function address (obj, args, context, info) {
  const { addr } = args
  return fetch('https://blockexplorer.com/api/addr/'+addr+'')
  .then(parser('address'))
}

address.prototype.typing = () => 'address(addr: String): Address'

module.exports = address
