function all_coins (obj, args, context, info) {
  const { pair='USD' } = args
  return context.getAllCoins(pair)
}

all_coins.prototype.typing = () => 'all_coins(pair: String): [Coin]'

module.exports = all_coins
