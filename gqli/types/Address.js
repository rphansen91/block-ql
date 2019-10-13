const transaction = require('../query/transaction')
const unspent = require('../query/unspent')
const pages = require('../pageResults')

function Address () {}

Address.prototype.typing = () =>
`type Address {
	addrStr: String
	balance: Int
	balanceSat: Int
	totalReceived: Int
	totalReceivedSat: Int
	totalSent: Int
	totalSentSat: Int
	unconfirmedBalance: Int
	unconfirmedBalanceSat: Int
	unconfirmedTxApperances: Int
	txApperances: Int
  tx(limit: Int, skip: Int): [Transaction]
  txCount: Int
  unspent(limit: Int, skip: Int): [Unspent]
}`

Address.tx = pages('transactions', function ({ transactions }) {
  return Promise.all(transactions.map(loadTransaction))
})

Address.txCount = function ({ transactions }) {
  if (transactions && transactions.length) return transactions.length
  return 0
}

Address.unspent = function ({ addrStr: addr }) {
  return unspent(null, { addr })
}

function loadTransaction (txid) {
  return transaction(null, { txid })
}

module.exports = Address
