const { generic, element, urlBtn } = require('../templates')
const formatDollar  = require('./dollar')
const formatPercent = require('./percent')
const formatSatoshi = require('./satoshi')

const btnText = 'HODL' // 'Track
const coinUrl = id => `https://hodlstream.com/coin/${id}`
const coinPng = symbol => `https://hodlstream.com/png/${symbol}.png`

module.exports = function formatCoin (c) {
  if (!c) return

  const {
    id,
    name,
    symbol,
    price_usd: usd,
    price_btc: btc,
    percent_change_24h: percent
  } = c

  return generic([element(
    `${name} ${formatPercent(percent)}`,
    `$${formatDollar(usd)} USD\n${formatSatoshi(btc)} BTC`,
    coinPng(symbol),
    [urlBtn(btnText, coinUrl(id))]
  )])
}
