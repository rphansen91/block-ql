const fetch = require('node-fetch')
const parser = require('../parseResult')
const { logger } = require('../../utils')

function transaction (obj, args, context, info) {
  const { txid } = args
  return fetch('https://blockexplorer.com/api/tx/'+txid)
  .then(parser('tx'))
  .then(logger('tx: ' + txid))
}

transaction.prototype.typing = () => 'transaction(txid: String): Transaction'

module.exports = transaction
