const fetch = require('node-fetch')
const coin = require('./coin')

function loadCoin (id, pair) {
  return coin({}, { id, pair })
}

function coins (obj, args, context, info) {
  const { ids, pair='USD' } = args
  console.log(ids);
  // if (!ids || !ids.length) return fetch('https://api.coinmarketcap.com/v1/ticker/?convert='+pair).then(res => res.json())
  return Promise.all((ids || []).map(id => loadCoin(id, pair)))
}

coins.prototype.typing = () => 'coins(ids: [String], pair: String): [Coin]'

module.exports = coins
