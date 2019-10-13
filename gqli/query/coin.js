const fetch = require('node-fetch')
const { symbolToId } = require('../../utils')

function coin (obj, args, context, info) {
  const { id, pair='USD' } = args

  if (!id) return null

  return context.getOneCoin(id, pair)
  .then((result) => {
    if (result) return result
    return symbolToId(id)
    .then(id => coin(obj, { id, pair }, context, info))
  })
}

coin.prototype.typing = () => 'coin(id: String, pair: String): Coin'

module.exports = coin
