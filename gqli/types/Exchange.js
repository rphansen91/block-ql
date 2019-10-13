const exchanges = require('../../exchanges')

function Exchange () {}

Exchange.prototype.typing = () =>
`type Exchange {
  name: String
  balance(apikey: String, apisecret: String): [ExchangeBalance]
  txs(apikey: String, apisecret: String): [ExchangeTx]
}`

Exchange.balance = function ({ name }, opts) {
  return exchanges[name].getBalance(opts)
}

Exchange.txs = function ({ name }, opts) {
  return exchanges[name].getOrders(opts)
}

module.exports = Exchange
