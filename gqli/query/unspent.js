const fetch = require('node-fetch')
const parser = require('../parseResult')
const { logger } = require('../../utils')

function unspent (obj, args, context, info) {
  const { addr } = args
  return fetch('https://blockexplorer.com/api/addr/'+addr+'/utxo')
  .then(parser('unspent'))
}

unspent.prototype.typing = () => 'unspent(addr: String): [Unspent]'

module.exports = unspent
