const fetch = require('node-fetch')
const transaction = require('../query/transaction')
const parser = require('../parseResult')
const { logger } = require('../../utils')

function send (obj, args, context, info) {
  const { rawtx } = args
  return fetch('https://blockexplorer.com/api/tx/send', {
    method: 'POST',
    body: JSON.stringify({ rawtx })
  })
  .then(parser('send'))
  .then(logger('send'))
  .then(loadTransaction)
}

send.prototype.typing = () => 'send(rawtx: String): Transaction'

function loadTransaction ({ txid }) {
  return transaction(null, { txid })
}

module.exports = send
