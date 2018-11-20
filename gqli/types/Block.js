const transaction = require('../query/transaction')
const pages = require('../pageResults')

function Block () {}

Block.prototype.typing = () =>
`type Block {
	hash: String
	size: Int
	height: Int
	version: Int
	merkleroot: String
  tx(limit: Int, skip: Int): [Transaction]
  txCount: Int
	time: Int
	nonce: Int
	bits: String
	difficulty: Int
	chainwork: String
	confirmations: Int
	previousblockhash: String
	nextblockhash: String
	reward: Int
}`

Block.tx = pages('tx', function ({ tx }) {
  return Promise.all(tx.map(loadTransaction))
})

Block.txCount = function ({ tx }) {
  if (tx && tx.length) return tx.length
  return 0
}

function loadTransaction (txid) {
  return transaction(null, { txid })
}

module.exports = Block
