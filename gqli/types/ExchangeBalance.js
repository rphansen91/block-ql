function ExchangeBalance () {}

ExchangeBalance.prototype.typing = () =>
`type ExchangeBalance {
  Currency: String
  Balance: Float
  Available: Float
  Pending: Float
}`

module.exports = ExchangeBalance
