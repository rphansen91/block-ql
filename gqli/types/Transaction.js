function Transaction () {}

Transaction.prototype.typing = () =>
`type Transaction {
	txid: String
	version: String
	locktime: Int
	blockhash: String
	blockheight: Int
	confirmations: Int
	time: Int
	blocktime: Int
	valueOut: Float
  size: Float
  fees: Float
}`

module.exports = Transaction
