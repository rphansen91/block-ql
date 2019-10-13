const fetch = require('node-fetch')
const coin = require('./coin')

function loadCoin (id, pair) {
  return coin({}, { id, pair })
}

function coins (obj, args, context, info) {
  const { ids, pair='USD' } = args
  return Promise.all((ids || []).map(id => context.getOneCoin(id, pair)))
}

coins.prototype.typing = () => 'coins(ids: [String], pair: String): [Coin]'

module.exports = coins
