import gql from 'graphql-tag'

export default gql`
  type Transaction {
    txid: String
    version: String
    locktime: Int
    blockhash: String
    blockheight: Int
    confirmations: Int
    time: Int
    blocktime: Int
    valueOut: Float
    size: Float
    fees: Float
  }

  type Send {
    txid: String
  }

  type Query {
    transaction(txid: String!): Transaction
  }

  type Mutation {
    send(rawtx: String!): Transaction
  }
`
