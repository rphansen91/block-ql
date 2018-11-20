const fetch = require('node-fetch')
const { symbolToId } = require('../../utils')

function coin (obj, args, context, info) {
  const { id, pair='USD' } = args

  if (!id) return null

  return fetch('https://api.coinmarketcap.com/v1/ticker/'+id+'?convert='+pair)
  .then(res => res.json())
  .then(res => res[0])
  .then(res => {
    if (!res) {
      return symbolToId(id)
      .then(id => coin({}, { id }))
    }
    return res
  })
}

coin.prototype.typing = () => 'coin(id: String, pair: String): Coin'

module.exports = coin
