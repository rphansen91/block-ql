import { QueryResolvers, CoinResolvers } from '../types'
import { IContext } from '../../context'

export const coinQuery: QueryResolvers<IContext> = {
  async coin(_, { id, pair }, {}) {
    return null
  },
  async coins(_, { ids, pair }, {}) {
    return null
  }
}

export const coinResolvers: CoinResolvers<IContext> = {}