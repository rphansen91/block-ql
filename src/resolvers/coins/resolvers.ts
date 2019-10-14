import { QueryResolvers, CoinResolvers } from '../types'
import { IContext } from '../../context'

export const coinQuery: QueryResolvers<IContext> = {
  async coin(_, { id, pair }, { coinMarketcap }) {
    const coin = await coinMarketcap.getOne(id, pair || undefined)
    return coin
  },
  async coins(_, { ids, pair }, { coinMarketcap }) {
    if (!ids) return coinMarketcap.getAll(pair || undefined)
    return Promise.all(ids.map(id => coinMarketcap.getOne(id, pair || undefined)))
  },
  async all_coins(_, { pair }, { coinMarketcap }) {
    return coinMarketcap.getAll(pair || undefined)
  }
}

export const coinResolvers: CoinResolvers<IContext> = {
  daily_volume_usd (coin) {
    if ((coin as any)['24h_volume_usd']) {
      return (coin as any)['24h_volume_usd']
    }
    return coin.daily_volume_usd
  },
  async history ({ symbol }, args, { cryptoCompare }) {
    if (!symbol) return []
    const history = await cryptoCompare.getHistory(symbol, args)
    return history
  },
  async articles({}, args, { getArticles }) {
    return getArticles(args)
  }
}