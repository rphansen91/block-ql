import gql from 'graphql-tag'

export default gql`
  type Exchange {
    name: String
    balance(apikey: String, apisecret: String): [ExchangeBalance]
    txs(apikey: String, apisecret: String): [ExchangeTx]
  }

  type ExchangeBalance {
    Currency: String
    Balance: Float
    Available: Float
    Pending: Float
  }

  type ExchangeTx {
    coin: String
    symbol: String
    createdAt: Int
    value: Float
  }

  type Query {
    exchange(name: String!): Exchange
  }
`
