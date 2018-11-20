const cacheFetch = require('../cacheFetch');
const qs = require('querystring')
const { findImages } = require('../../utils')
const news = require('../query/news')

function Coin () {}

Coin.prototype.typing = () =>
`type Coin {
	id: String
	name: String
	symbol: String
	rank: Int
	price_usd: Float
	price_btc: Float
	daily_volume_usd: Float
	market_cap_usd: Float
	available_supply: Float
	total_supply: Float
	max_supply: Float
	percent_change_1h: Float
	percent_change_24h: Float
	percent_change_7d: Float
  last_updated: Float
  history(pair: String!, limit: Int): [Pair]
  images: [String]
  articles: [Article]
}`

Coin['daily_volume_usd'] = coin => coin['24h_volume_usd']

Coin.history = function ({ symbol }, { pair, limit }) {
  return cacheFetch('https://min-api.cryptocompare.com/data/histoday?' + qs.stringify({
    aggregate: 1,
    e: 'CCCAGG',
    fsym: symbol.toUpperCase(),
    tsym: (symbol === pair) ? 'USD' : pair.toUpperCase(),
    limit: limit || 365,
    tryConversion: false
  }), null, 1000 * 60 * 60)
  .then(res => {
    if (res.Message) return []//Promise.reject(new Error(res.Message))
    return res
  })
  .then(({ Data }) => (Data || []).map(d => ({
    value: (symbol === pair) ? 1 : ((d.high + d.low) / 2),
    ts: d.time
  })))
}

Coin.articles = function ({ name }) {
  return news({}, { q: name })
}

Coin.images = function ({ symbol }, { limit=10 }) {
  return findImages({ q: symbol, limit })
}

module.exports = Coin
