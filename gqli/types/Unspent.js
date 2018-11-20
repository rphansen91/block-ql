function Unspent () {}

Unspent.prototype.typing = () => `
type Unspent {
  address: String
  txid: String
  vout: Float
  scriptPubKey: String
  amount: Float
  satoshis: Int
  height: Int
  confirmations: Int
}
`

module.exports = Unspent
