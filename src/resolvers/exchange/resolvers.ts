import { QueryResolvers, ExchangeResolvers, ExchangeBalanceResolvers, ExchangeTxResolvers } from '../types'
import { IContext } from '../../context'

export const exchangeQuery: QueryResolvers<IContext> = {
  async exchange(_, { name }, {}) {
    return null
  },
}

export const exchangeResolvers: ExchangeResolvers<IContext> = {}
export const exchangeBalanceResolvers: ExchangeBalanceResolvers<IContext> = {}
export const exchangeTxResolvers: ExchangeTxResolvers<IContext> = {}