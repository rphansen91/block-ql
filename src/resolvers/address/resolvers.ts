import { QueryResolvers, AddressResolvers, AddressValidResolvers, UnspentResolvers } from '../types'
import { IContext } from '../../context'

export const addressQuery: QueryResolvers<IContext> = {
  async address(_, { addr }, { blockExplorer }) {
    return blockExplorer.address(addr)
  },
  async addressValid(_, { addr }, { blockExplorer }) {
    return blockExplorer.addressValid(addr)
  },
  async unspent(_, { addr }, { blockExplorer }) {
    return blockExplorer.unspent(addr)
  }
}

export const addressResolvers: AddressResolvers<IContext> = {}
export const addressValidResolvers: AddressValidResolvers<IContext> = {}
export const unspentResolvers: UnspentResolvers<IContext> = {}