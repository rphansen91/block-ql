import defaultsDeep from 'lodash/defaultsDeep'
import { mergeTypes } from 'merge-graphql-schemas'
import { GraphQLJSON } from 'graphql-type-json'
import rootDefs from './root/schema'
import addressDefs from './address/schema'
import { addressQuery, addressResolvers, addressValidResolvers, unspentResolvers } from './address/resolvers'
import blockDefs from './block/schema'
import { blockQuery, blockResolvers } from './block/resolvers'
import coinDefs from './coins/schema'
import { coinQuery, coinResolvers } from './coins/resolvers'
import exchangeDefs from './exchange/schema'
import { exchangeQuery, exchangeResolvers, exchangeBalanceResolvers, exchangeTxResolvers } from './exchange/resolvers'
import newsDefs from './news/schema'
import { newsQuery, articleResolvers } from './news/resolvers'
import transactionDefs from './transaction/schema'
import { transactionQuery, transactionMutation, transactionResolvers } from './transaction/resolvers'

export const typeDefs = mergeTypes([
  rootDefs,
  addressDefs,
  blockDefs,
  coinDefs,
  exchangeDefs,
  newsDefs,
  transactionDefs
])

export const resolvers = defaultsDeep({
  Query: {
    ...addressQuery,
    ...blockQuery,
    ...coinQuery,
    ...exchangeQuery,
    ...newsQuery,
    ...transactionQuery
  },
  Mutation: {
    ...transactionMutation
  },
  Article: articleResolvers,
  Address: addressResolvers,
  AddressValid: addressValidResolvers,
  Unspent: unspentResolvers,
  Block: blockResolvers,
  Coin: coinResolvers,
  Exchange: exchangeResolvers,
  ExchangeBalance: exchangeBalanceResolvers,
  ExchangeTx: exchangeTxResolvers,
  Transaction: transactionResolvers,
  JSON: GraphQLJSON
})

