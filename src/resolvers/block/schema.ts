import gql from 'graphql-tag'

export default gql`
  type Block {
    hash: String
    size: Int
    height: Int
    version: Int
    merkleroot: String
    tx(limit: Int, skip: Int): [Transaction]
    txCount: Int
    time: Int
    nonce: Int
    bits: String
    difficulty: Int
    chainwork: String
    confirmations: Int
    previousblockhash: String
    nextblockhash: String
    reward: Int
  }

  type Query {
    block(hash: String!): Block
    blockIndex(height: Int!): Block
  }
`
