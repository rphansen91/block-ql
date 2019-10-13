function ExchangeTx () {}

ExchangeTx.prototype.typing = () =>
`type ExchangeTx {
  coin: String
  symbol: String
  createdAt: Int
  value: Float
}`

module.exports = ExchangeTx
