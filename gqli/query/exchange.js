const exchanges = require('../../exchanges')

function exchange (obj, args, context, info) {
  const name = (args.name || '').toLowerCase()
  if (!exchanges[name]) throw new Error(`"${name}" is not a valid exchange`)
  return { name }
}

exchange.prototype.typing = () => 'exchange(name: String): Exchange'

module.exports = exchange
