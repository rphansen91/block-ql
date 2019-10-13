import { QueryResolvers, MutationResolvers, TransactionResolvers } from '../types'
import { IContext } from '../../context'

export const transactionQuery: QueryResolvers<IContext> = {
  async transaction(_, { txid }, { blockExplorer }) {
    return blockExplorer.transaction(txid)
  }
}

export const transactionMutation: MutationResolvers<IContext> = {
  async send(_, { rawtx }, { blockExplorer }) {
    return blockExplorer.send(rawtx)
  }
}

export const transactionResolvers: TransactionResolvers<IContext> = {}