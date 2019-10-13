import { QueryResolvers, BlockResolvers } from '../types'
import { IContext } from '../../context'

export const blockQuery: QueryResolvers<IContext> = {
  async block(_, { hash }, { blockExplorer }) {
    return blockExplorer.block(hash)
  },
  async blockIndex(_, { height }, { blockExplorer }) {
    return blockExplorer.blockIndex(height)
  }
}

export const blockResolvers: BlockResolvers<IContext> = {}